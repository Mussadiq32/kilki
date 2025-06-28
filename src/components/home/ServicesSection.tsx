"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { 
  Home, 
  Building, 
  TrendingUp, 
  Users, 
  Shield, 
  Award,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

// Mouse position hook
const useMousePositionRef = (containerRef?: React.RefObject<HTMLElement>) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        positionRef.current = { x: relativeX, y: relativeY };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
};

// Floating parallax component
interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = React.createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: React.ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >()
  );
  const mousePositionRef = useMousePositionRef(containerRef);

  const registerElement = React.useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      });
    },
    []
  );

  const unregisterElement = React.useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;
      const newTargetX = mousePositionRef.current.x * strength;
      const newTargetY = mousePositionRef.current.y * strength;
      const dx = newTargetX - data.currentPosition.x;
      const dy = newTargetY - data.currentPosition.y;

      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={`absolute top-0 left-0 w-full h-full ${className}`}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

const FloatingElement = ({
  children,
  className,
  depth = 1,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = React.useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;

    const nonNullDepth = depth ?? 0.01;
    context.registerElement(idRef.current, elementRef.current, nonNullDepth);
    return () => context.unregisterElement(idRef.current);
  }, [depth, context]);

  return (
    <div
      ref={elementRef}
      className={`absolute will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

// Text rotate component
interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
}

const TextRotate = ({ texts, rotationInterval = 3000, className }: TextRotateProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
};

// Services data
const servicesData = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Find your dream home with our expert residential sales team. We provide personalized service and market insights.",
    features: ["Market Analysis", "Property Valuation", "Negotiation Support", "Closing Assistance"],
    gradient: "from-royal-200/60 to-gold-200/60",
    glowColor: "royal"
  },
  {
    icon: Building,
    title: "Commercial Properties",
    description: "Comprehensive commercial real estate solutions for businesses, investors, and developers.",
    features: ["Investment Analysis", "Lease Negotiations", "Property Management", "Market Research"],
    gradient: "from-gold-300/60 to-royal-400/60",
    glowColor: "gold"
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Strategic investment guidance to maximize your real estate portfolio returns.",
    features: ["Portfolio Analysis", "ROI Optimization", "Risk Assessment", "Growth Strategies"],
    gradient: "from-gold-400/60 to-royal-300/60",
    glowColor: "gold"
  },
  {
    icon: Users,
    title: "Property Management",
    description: "Full-service property management to maximize your rental income and property value.",
    features: ["Tenant Screening", "Maintenance Coordination", "Rent Collection", "Financial Reporting"],
    gradient: "from-royal-300/60 to-gold-200/60",
    glowColor: "royal"
  },
  {
    icon: Shield,
    title: "Legal Services",
    description: "Expert legal support for all your real estate transactions and disputes.",
    features: ["Contract Review", "Title Insurance", "Dispute Resolution", "Compliance Support"],
    gradient: "from-gold-200/60 to-royal-200/60",
    glowColor: "gold"
  },
  {
    icon: Award,
    title: "Luxury Estates",
    description: "Exclusive service for high-end properties and discerning clients.",
    features: ["White-Glove Service", "Global Marketing", "Privacy Protection", "Concierge Support"],
    gradient: "from-gold-400/60 to-gold-600/60",
    glowColor: "gold"
  }
];

const trustIndicators = [
  { label: "Properties Sold", value: "2,500+", icon: Home },
  { label: "Happy Clients", value: "1,800+", icon: Users },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Market Coverage", value: "50+", icon: MapPin }
];

// Counter component
const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

// Service card component
const ServiceCard = ({ service, index }: { service: typeof servicesData[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.23, 0.86, 0.39, 0.96]
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card */}
      <motion.div
        className="relative h-full bg-royal-900/80 backdrop-blur-xl border border-gold-400 rounded-3xl p-8 overflow-hidden"
        whileHover={{ 
          y: -8,
          rotateX: 5,
          rotateY: 5,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-100/40 to-royal-100/40" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold-200/30 to-transparent rounded-full -translate-y-16 translate-x-16" />
        </div>

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-gold-400 flex items-center justify-center mb-6 relative z-10`}
          whileHover={{ 
            scale: 1.1,
            rotateY: 180,
          }}
          transition={{ duration: 0.6 }}
        >
          <service.icon className="w-8 h-8 text-gold-500" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gold-400 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gold-400 group-hover:to-gold-600 transition-all duration-300">
            {service.title}
          </h3>
          
          <p className="text-gold-100/80 text-lg mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center gap-3 text-gold-100/90"
              >
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Floating micro-interactions */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-gold-400/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main component
export function PremiumServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-br from-royal-100 via-gold-50 to-royal-300 text-royal-900 overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gold-100/[0.12] via-royal-100/[0.08] to-gold-200/[0.12]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />

        {/* Floating blobs */}
        <Floating sensitivity={-0.5} className="pointer-events-none">
          <FloatingElement depth={1} className="top-1/4 left-1/5">
            <motion.div
              className="w-64 h-64 bg-gradient-to-br from-gold-400/20 to-royal-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </FloatingElement>
          
          <FloatingElement depth={2} className="bottom-1/4 right-1/5">
            <motion.div
              className="w-48 h-48 bg-gradient-to-br from-gold-200/30 to-royal-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </FloatingElement>

          <FloatingElement depth={0.5} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-96 h-96 bg-gradient-to-br from-gold-100/10 to-royal-100/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </FloatingElement>
        </Floating>

        {/* Particle effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold-100/[0.18] border border-gold-200/[0.25] backdrop-blur-sm mb-8"
            whileHover={{ scale: 1.05, borderColor: "rgba(212, 163, 115, 0.3)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-gold-400" />
            </motion.div>
            <span className="text-lg font-medium text-gold-700">
              Premium Real Estate Services
            </span>
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tight bg-gradient-to-r from-gold-600 via-gold-400 to-royal-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-royal-700">
              Our
            </span>
            <br />
            <TextRotate
              texts={["Premium", "Exclusive", "Luxury", "Elite"]}
              className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-royal-400"
            />
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-royal-700">
              Services
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-royal-700 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience unparalleled real estate services designed for the modern market. 
            From luxury estates to commercial investments, we deliver excellence at every step.
          </motion.p>

          {/* Glowing divider */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-royal-400 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gold-100/10 backdrop-blur-xl rounded-2xl border border-gold-200/25 group hover:bg-gold-100/20 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-200/30 to-royal-200/30 border border-gold-200 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <indicator.icon className="w-6 h-6 text-gold-500" />
              </motion.div>
              <div className="text-3xl font-bold text-gold-600 mb-2">
                <Counter end={parseInt(indicator.value.replace(/\D/g, ''))} />
                {indicator.value.replace(/\d/g, '')}
              </div>
              <div className="text-gold-700 text-sm">{indicator.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Floating CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="mailto:info@royalgroupofrealestates.com?subject=Consultation%20Request"
            className="group relative px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-white font-bold text-xl rounded-2xl overflow-hidden shadow-lg inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-100/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-3">
              <Mail className="w-6 h-6" />
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Demo() {
  return <PremiumServicesSection />;
}
