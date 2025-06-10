import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface CityData {
  name: string;
  image: string;
  properties: number;
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
        "relative rounded-lg overflow-hidden cursor-pointer group h-48 sm:h-64 md:h-80",
        isActive ? "shadow-2xl z-10" : "shadow-lg",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="absolute inset-0"
        animate={{ y: isActive ? -10 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-royal-900/90 via-royal-900/40 to-transparent transition-opacity duration-500",
          isActive ? "opacity-60" : "opacity-80 group-hover:opacity-60"
        )}></div>
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3
          className={cn(
            "font-display text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3",
            "transform transition-transform duration-500"
          )}
          animate={{ y: isActive ? 0 : 10 }}
        >
          {name}
        </motion.h3>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center text-white/90 space-y-2 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <MapPin size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            <span className="font-medium text-sm sm:text-base">{animatedProperties} Properties</span>
          </div>
          <motion.button
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gold-500/90 hover:bg-gold-500 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CitiesSection = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const defaultCities = [
    {
      name: "Delhi",
      image: "https://images.unsplash.com/photo-1595928607828-6fdaee9c0942?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0
    },
    {
      name: "Bangalore",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0
    },
    {
      name: "Hyderabad",
      image: "https://images.unsplash.com/photo-1696488331221-1e08719a3a6c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0
    },
    {
      name: "Gurgaon",
      image: "https://images.unsplash.com/photo-1562566932-bfdfd81dd480?q=80&w=2316&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 0
    },
    {
      name: "Chandigarh",
      image: "https://static.theprint.in/wp-content/uploads/2022/12/ANI-20221202132453.jpg",
      properties: 0
    },
    {
      name: "Srinagar",
      image: "https://www.ekashmirtourism.com/wp-content/uploads/2022/08/dal-lake-winter.jpg",
      properties: 0
    },
    {
      name: "Jammu",
      image: "https://img.etimg.com/thumb/msid-94202816,width-640,height-480,imgsize-63816,resizemode-4/remarkable-achievement.jpg",
      properties: 0
    },
    {
      name: "Ahmedabad",
      image: "https://content.jdmagicbox.com/comp/ahmedabad/e6/079pxx79.xx79.201112112825.e4e6/catalogue/taj-skyline-bodakdev-ahmedabad-hotels-1gk28lttx1.jpg",
      properties: 0
    },
    {
      name: "Mumbai",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mumbai_Skyline_at_Night.jpg/1024px-Mumbai_Skyline_at_Night.jpg",
      properties: 0
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
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center py-12 sm:py-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-3 sm:mt-4 text-royal-600 text-sm sm:text-base">Loading cities...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding overflow-hidden">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div 
            className="inline-block px-2 sm:px-3 py-1 sm:py-1 bg-gold-100 text-gold-600 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Our Locations
          </motion.div>
          <motion.h2 
            className="heading-lg text-royal-800 mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore Properties Across <span className="text-gradient">Major Cities</span>
          </motion.h2>
          <motion.p 
            className="text-royal-600 text-sm sm:text-base"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover premium real estate opportunities in India's most vibrant and growing cities, each offering unique lifestyle and investment advantages.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence>
            {citiesData.map((city, index) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CityCard
                  name={city.name}
                  image={city.image}
                  properties={city.properties}
                  onMouseEnter={() => setActiveCity(city.name)}
                  onMouseLeave={() => setActiveCity(null)}
                  onClick={() => handleCityClick(city.name)}
                  isActive={activeCity === city.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CitiesSection;
