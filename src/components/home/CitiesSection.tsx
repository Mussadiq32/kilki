import { useState, useEffect } from 'react';
import { MapPin, Building, TrendingUp, Star, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface CityData {
  name: string;
  image: string;
  properties: number;
  description?: string;
  color?: string;
}

interface CityCardProps extends CityData {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const CityCard = ({ 
  name, 
  image, 
  properties, 
  description,
  color = "from-gold-500 to-gold-600",
  className,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
  onClick
}: CityCardProps) => {
  const [animatedProperties, setAnimatedProperties] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 20;
    const increment = properties / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= properties) {
        setAnimatedProperties(properties);
        clearInterval(timer);
      } else {
        setAnimatedProperties(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [properties]);

  return (
    <motion.div 
      className={cn(
        "relative rounded-2xl overflow-hidden cursor-pointer group h-64 sm:h-72 md:h-80",
        isActive ? "shadow-2xl z-10 ring-2 ring-gold-400/50" : "shadow-xl hover:shadow-2xl",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Background Image with Enhanced Effects */}
      <motion.div 
        className="absolute inset-0"
        animate={{ y: isActive ? -10 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Multiple Gradient Overlays */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500",
          isActive ? "opacity-70" : "opacity-80 group-hover:opacity-70"
        )}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        >
          <Star size={16} className="text-gold-400" />
        </motion.div>
      </div>

      {/* City Badge */}
      <motion.div
        className="absolute top-4 left-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          <span className="text-white/90 text-xs font-medium">{name}</span>
        </div>
      </motion.div>
      
      {/* Content Overlay */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* City Name */}
        <motion.h3
          className={cn(
            "font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3",
            "transform transition-transform duration-500"
          )}
          animate={{ y: isActive ? 0 : 10 }}
        >
          {name}
        </motion.h3>

        {/* Description */}
        {description && (
          <motion.p
            className="text-white/80 text-sm mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}

        {/* Stats and CTA */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {/* Properties Count */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <Building size={16} className="text-gold-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">{animatedProperties}</div>
              <div className="text-white/70 text-xs">Properties</div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className={cn(
              "px-4 py-2 bg-gradient-to-r", color,
              "text-white rounded-xl font-semibold text-sm transition-all duration-300",
              "flex items-center space-x-2 shadow-lg hover:shadow-xl",
              "transform hover:scale-105"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Hover Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-r from-gold-400/20 via-transparent to-gold-400/20"
      )}></div>
    </motion.div>
  );
};

const CitiesSection = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const defaultCities: CityData[] = [
    {
      name: "Delhi",
      image: "https://images.unsplash.com/photo-1595928607828-6fdaee9c0942?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0,
      description: "Capital City - Heart of India",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Bangalore",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0,
      description: "IT Hub - Silicon Valley of India",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Hyderabad",
      image: "https://images.unsplash.com/photo-1696488331221-1e08719a3a6c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0,
      description: "Pearl City - Tech & Culture",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Gurgaon",
      image: "https://images.unsplash.com/photo-1562566932-bfdfd81dd480?q=80&w=2316&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0,
      description: "Millennium City - Corporate Hub",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Chandigarh",
      image: "https://static.theprint.in/wp-content/uploads/2022/12/ANI-20221202132453.jpg",
      properties: 0,
      description: "City Beautiful - Planned Excellence",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Srinagar",
      image: "https://www.ekashmirtourism.com/wp-content/uploads/2022/08/dal-lake-winter.jpg",
      properties: 0,
      description: "Kashmir Valley - Paradise on Earth",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Jammu",
      image: "https://img.etimg.com/thumb/msid-94202816,width-640,height-480,imgsize-63816,resizemode-4/remarkable-achievement.jpg",
      properties: 0,
      description: "Temple City - Spiritual Heritage",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Ahmedabad",
      image: "https://content.jdmagicbox.com/comp/ahmedabad/e6/079pxx79.xx79.201112112825.e4e6/catalogue/taj-skyline-bodakdev-ahmedabad-hotels-1gk28lttx1.jpg",
      properties: 0,
      description: "Manchester of India - Textile Hub",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Mumbai",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mumbai_Skyline_at_Night.jpg/1024px-Mumbai_Skyline_at_Night.jpg",
      properties: 0,
      description: "City of Dreams - Financial Capital",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const fetchCitiesData = async () => {
    setLoading(true);
    try {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('location')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Count properties by city
      const cityCount: { [key: string]: number } = {};
      
      properties?.forEach(property => {
        const location = property.location;
        defaultCities.forEach(city => {
          if (location.toLowerCase().includes(city.name.toLowerCase())) {
            cityCount[city.name] = (cityCount[city.name] || 0) + 1;
          }
        });
      });
      
      // Update cities data with actual counts
      const updatedCities = defaultCities.map(city => ({
        ...city,
        properties: cityCount[city.name] || 0
      }));
      
      setCitiesData(updatedCities);
    } catch (error: any) {
      console.error('Error fetching cities data:', error);
      setCitiesData(defaultCities);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitiesData();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        () => {
          console.log('Property table change detected, refreshing cities data...');
          fetchCitiesData();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCityClick = (cityName: string) => {
    // Navigate to properties page with city filter
    navigate(`/properties?location=${cityName.toLowerCase()}`);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-royal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="text-center py-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-royal-600 text-lg font-medium"
            >
              Loading amazing cities...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-royal-50 via-white to-gold-50/30 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gold-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-gold-200 rounded-full text-gold-700 text-sm font-semibold mb-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Globe size={16} className="mr-2" />
            Our Locations
            <Sparkles size={16} className="ml-2 text-gold-500" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-royal-800 mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore Properties Across{' '}
            <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              Major Cities
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-royal-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover premium real estate opportunities in India's most vibrant and growing cities, 
            each offering unique lifestyle and investment advantages.
          </motion.p>

          {/* Stats Summary */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: <Building size={20} />, label: "9 Cities", value: "Coverage" },
              { icon: <TrendingUp size={20} />, label: "500+", value: "Properties" },
              { icon: <Star size={20} />, label: "Premium", value: "Quality" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 text-royal-700">
                <div className="p-2 bg-gold-100 rounded-lg">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">{stat.label}</div>
                  <div className="text-sm text-royal-500">{stat.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Cities Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatePresence>
            {citiesData.map((city, index) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ y: -5 }}
              >
                <CityCard
                  name={city.name}
                  image={city.image}
                  properties={city.properties}
                  description={city.description}
                  color={city.color}
                  onMouseEnter={() => setActiveCity(city.name)}
                  onMouseLeave={() => setActiveCity(null)}
                  onClick={() => handleCityClick(city.name)}
                  isActive={activeCity === city.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            onClick={() => navigate('/properties')}
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Properties</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CitiesSection;
