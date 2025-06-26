import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Award, Heart, Shield, Zap } from 'lucide-react';
import { FaQuoteLeft, FaQuoteRight, FaUserTie, FaHome, FaBuilding, FaCity } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  role?: string;
  property?: string;
  icon?: React.ReactNode;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ritu Patel",
      location: "Mumbai",
      rating: 5,
      role: "First-time Homebuyer",
      property: "3BHK Apartment",
      icon: <FaHome size={20} />,
      text: "Royal Group made my first home purchase so easy! Their team was supportive and transparent throughout the process. Highly recommended!"
    },
    {
      id: 2,
      name: "Mukesh Choudary",
      location: "Delhi",
      rating: 5,
      role: "Property Investor",
      property: "Commercial Space",
      icon: <FaBuilding size={20} />,
      text: "I was impressed by the professionalism and dedication of Royal Group. They helped me find the perfect investment property in no time."
    },
    {
      id: 3,
      name: "Gagan Deep Singh",
      location: "Chandigarh",
      rating: 5,
      role: "Business Owner",
      property: "Office Space",
      icon: <FaCity size={20} />,
      text: "The team at Royal Group is knowledgeable and trustworthy. They guided me through every step and ensured a smooth transaction."
    },
    {
      id: 4,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      role: "Family Homebuyer",
      property: "4BHK Villa",
      icon: <FaHome size={20} />,
      text: "Excellent service and great attention to detail. I found my dream home thanks to Royal Group!"
    },
    {
      id: 5,
      name: "Rahul Verma",
      location: "Hyderabad",
      rating: 5,
      role: "Property Owner",
      property: "Rental Property",
      icon: <FaBuilding size={20} />,
      text: "Royal Group's property management is top-notch. I never have to worry about my rental property anymore."
    },
  ];

  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4 lg:w-5 lg:h-5", 
          i < rating ? "text-gold-500 fill-gold-500" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-royal-50 via-white to-gold-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px)] bg-[size:4rem_1px] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:1px_4rem] opacity-20" />
      
      {/* Floating Icons */}
      <div className="absolute top-20 left-10 text-gold-200 opacity-30 animate-bounce-gentle">
        <Award size={40} />
      </div>
      <div className="absolute top-40 right-20 text-royal-200 opacity-30 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
        <Heart size={40} />
      </div>
      <div className="absolute bottom-20 left-20 text-gold-200 opacity-30 animate-bounce-gentle" style={{ animationDelay: '2s' }}>
        <Shield size={40} />
      </div>
      <div className="absolute bottom-40 right-10 text-royal-200 opacity-30 animate-bounce-gentle" style={{ animationDelay: '3s' }}>
        <Zap size={40} />
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div 
            className="inline-block px-3 lg:px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs lg:text-sm font-medium rounded-full mb-4 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Award size={14} className="lg:w-4 lg:h-4" />
              <span>Client Testimonials</span>
            </div>
          </motion.div>
          <motion.h2 
            className="text-2xl lg:text-4xl xl:text-5xl font-bold text-royal-800 mb-4 lg:mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What Our <span className="text-gradient">Clients</span> Say
          </motion.h2>
          <motion.p 
            className="text-royal-600 text-sm lg:text-base"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover why our clients trust Royal Group for their real estate needs. Read authentic testimonials from satisfied customers who have experienced our exceptional service.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonial Carousel */}
          <div 
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white via-royal-50 to-gold-50 p-2 shadow-xl lg:shadow-2xl"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="relative p-4 lg:p-8 xl:p-12 overflow-hidden rounded-xl lg:rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20">
              {/* Quote Icons */}
              <div className="absolute top-4 lg:top-8 left-4 lg:left-8 text-gold-200 opacity-40">
                <FaQuoteLeft size={40} className="lg:w-[60px] lg:h-[60px]" />
              </div>
              <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 text-gold-200 opacity-40">
                <FaQuoteRight size={40} className="lg:w-[60px] lg:h-[60px]" />
              </div>
              
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center"
                >
                  {/* Testimonial Image/Initials */}
                  <div className="w-full lg:w-2/5 flex-shrink-0">
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-32 h-32 lg:w-40 lg:h-40 xl:w-56 xl:h-56 mx-auto rounded-full bg-gradient-to-br from-gold-400 via-royal-500 to-gold-600 flex items-center justify-center text-white text-4xl lg:text-6xl xl:text-8xl font-bold border-4 lg:border-8 border-white shadow-xl lg:shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl">
                        {getInitials(testimonials[currentIndex].name)}
                        <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-gold-500 to-royal-600 rounded-full flex items-center justify-center border-2 lg:border-4 border-white shadow-lg">
                          {testimonials[currentIndex].icon}
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-6 space-y-2 text-center">
                        <div className="bg-gradient-to-r from-gold-500 to-royal-600 text-white px-4 lg:px-6 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-lg">
                          {testimonials[currentIndex].location}
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm px-3 lg:px-4 py-2 rounded-lg border border-white/20 shadow-sm">
                          <p className="text-royal-700 text-xs lg:text-sm font-medium">{testimonials[currentIndex].role}</p>
                          <p className="text-royal-600 text-xs">{testimonials[currentIndex].property}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start mb-4 lg:mb-6">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="text-lg lg:text-xl xl:text-2xl font-display italic text-royal-700 mb-6 lg:mb-8 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xl lg:text-2xl font-bold text-royal-800">{testimonials[currentIndex].name}</h4>
                      <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <FaUserTie size={14} className="lg:w-4 lg:h-4 text-gold-500" />
                        <span className="text-royal-600 font-medium text-sm lg:text-base">{testimonials[currentIndex].role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 lg:px-6 z-10">
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-royal-800 hover:bg-gold-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-royal-800 hover:bg-gold-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 lg:mt-12 space-x-2 lg:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 shadow-md",
                  index === currentIndex 
                    ? "bg-gradient-to-r from-gold-500 to-royal-600 w-6 lg:w-8 scale-110" 
                    : "bg-royal-200 hover:bg-royal-300 hover:scale-110"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 bg-white/60 backdrop-blur-sm px-4 lg:px-8 py-3 lg:py-4 rounded-full border border-white/20 shadow-lg">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-500 w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-royal-700 font-medium text-sm lg:text-base">Trusted by 500+ Clients</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-royal-200"></div>
              <div className="flex items-center space-x-2">
                <Award className="text-gold-500 w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-royal-700 font-medium text-sm lg:text-base">15+ Years Experience</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-royal-200"></div>
              <div className="flex items-center space-x-2">
                <Heart className="text-red-500 w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-royal-700 font-medium text-sm lg:text-base">100% Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;