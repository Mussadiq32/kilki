import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Home, 
  Building, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Star,
  TrendingUp,
  Shield,
  Award,
  Zap,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  X
} from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import PropertySearch from '../ui/PropertySearch';
import VideoModal from '../ui/VideoModal';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import RoyalLoader from "@/components/ui/RoyalLoader";
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = () => {
    // Build search parameters for the Properties page
    const searchParams = new URLSearchParams();
    
    if (searchQuery) {
      searchParams.set('query', searchQuery);
    }
    
    if (selectedLocation) {
      searchParams.set('location', selectedLocation.toLowerCase());
    }
    
    if (selectedType) {
      searchParams.set('type', selectedType.toLowerCase());
    }
    
    if (selectedBudget) {
      // Convert budget range to price range
      const budgetRanges = {
        'Under 50 Lac': { min: 0, max: 5000000 },
        '50 Lac - 1 Cr': { min: 5000000, max: 10000000 },
        '1 Cr - 2 Cr': { min: 10000000, max: 20000000 },
        '2 Cr - 5 Cr': { min: 20000000, max: 50000000 },
        '5 Cr+': { min: 50000000, max: undefined }
      };
      
      const range = budgetRanges[selectedBudget as keyof typeof budgetRanges];
      if (range) {
        if (range.min !== undefined) {
          searchParams.set('minPrice', range.min.toString());
        }
        if (range.max !== undefined) {
          searchParams.set('maxPrice', range.max.toString());
        }
      }
    }
    
    // Navigate to Properties page with search parameters
    const propertiesUrl = `/properties?${searchParams.toString()}`;
    navigate(propertiesUrl);
  };

  const handleSelectLocation = (city: string) => {
    setSelectedLocation(city);
    toggleDropdown('location');
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    toggleDropdown('type');
  };

  const handleSelectBudget = (budget: string) => {
    setSelectedBudget(budget);
    toggleDropdown('budget');
  };

  const handleWatchVideo = () => {
    setShowVideoModal(true);
  };

  // Modern animated heading with gradient text
  const ModernHeading = () => {
    const heading = "Find Your Dream Property in India's Finest Locations";
    const words = heading.split(' ');
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
        {words.map((word, i) => (
          <motion.span
            key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + (i * 0.1),
                ease: "easeOut"
              }}
              className={cn(
                "inline-block mr-2 sm:mr-3",
                word === 'Property' ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent' : 'text-white',
                word === 'Dream' ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent' : '',
                word === 'India' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent' : ''
              )}
          >
            {word}
          </motion.span>
        ))}
        </h1>
      </motion.div>
    );
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Modern Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
          {/* Main Background Image */}
          <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600" 
          alt="Luxury home" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-gold-500/10 animate-pulse"></div>
          
          {/* Floating Particles Effect - Optimized */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gold-400/20 rounded-full"
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto relative z-10 px-2 sm:px-4 md:px-8 lg:px-24 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium"
                >
                  <Sparkles size={16} className="mr-2 text-gold-400" />
                  Trusted by 10,000+ Homeowners
                  <Sparkles size={16} className="ml-2 text-gold-400" />
                </motion.div>

                {/* Modern Heading */}
                <ModernHeading />

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl"
                >
                  Discover premium properties across major Indian cities with Royal Group of Real Estates, 
                  your trusted partner in real estate excellence.
                </motion.p>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  {[
                    { icon: <Shield size={20} />, text: "Verified Properties" },
                    { icon: <Award size={20} />, text: "Best Deals" },
                    { icon: <Star size={20} />, text: "Premium Quality" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-white/70 text-sm">
                      <div className="mr-2 text-gold-400">{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    Start Your Search
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWatchVideo}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Play size={20} className="mr-2" />
                    Watch Video
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Column - Search Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                {/* Floating Search Card */}
        <motion.div 
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Enhanced Tabs */}
                  <div className="flex mb-6 p-1 bg-gray-100 rounded-2xl">
            {[
                      { key: 'buy', label: 'Buy', icon: <Home size={18} />, color: 'from-green-500 to-emerald-600' },
                      { key: 'rent', label: 'Rent', icon: <Bed size={18} />, color: 'from-blue-500 to-cyan-600' },
                      { key: 'sell', label: 'Sell', icon: <TrendingUp size={18} />, color: 'from-purple-500 to-violet-600' }
            ].map((tab) => (
              <button 
                key={tab.key}
                className={cn(
                          "flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1",
                  activeTab === tab.key 
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                            : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                )}
                onClick={() => {
                  if (tab.key === 'buy') {
                    setActiveTab('buy');
                  } else {
                    toast({ title: 'Coming soon!', description: `${tab.label} feature is coming soon.` });
                  }
                }}
              >
                        <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
                  {/* Enhanced Search Fields */}
                  <div className="space-y-4 mb-6">
            {/* Location Field */}
            <div className="relative group">
              <div 
                        className="border-2 border-gray-200 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 transition-all duration-300 bg-white group-hover:shadow-lg"
                onClick={() => toggleDropdown('location')}
              >
                        <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg mr-3">
                          <MapPin size={18} className="text-white" />
                </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 font-medium">Location</div>
                          <div className="text-gray-800 font-semibold">
                    {selectedLocation || "Select City"}
                  </div>
                </div>
                        <ChevronDown size={18} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
              </div>
              
                      <AnimatePresence>
                        {activeDropdown === 'location' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 border border-gray-200"
                          >
                            <div className="p-4">
                              <div className="text-xs font-semibold text-gray-500 mb-3">Popular Cities</div>
                  {['Srinagar', 'Jammu', 'Chandigarh', 'Delhi', 'Gurgaon', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Mumbai'].map((city) => (
                    <div 
                      key={city} 
                                  className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-gray-800 hover:scale-105"
                      onClick={() => handleSelectLocation(city)}
                    >
                                  <div className="p-1.5 bg-gold-100 rounded-md mr-3">
                                    <MapPin size={14} className="text-gold-600" />
                      </div>
                                  <span className="font-medium">{city}</span>
                    </div>
                  ))}
                </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
            </div>
            
            {/* Property Type Field */}
            <div className="relative group">
              <div 
                        className="border-2 border-gray-200 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 transition-all duration-300 bg-white group-hover:shadow-lg"
                onClick={() => toggleDropdown('type')}
              >
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mr-3">
                          <Building size={18} className="text-white" />
                </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 font-medium">Property Type</div>
                          <div className="text-gray-800 font-semibold">
                    {selectedType || "Select Type"}
                  </div>
                </div>
                        <ChevronDown size={18} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
              </div>
              
                      <AnimatePresence>
                        {activeDropdown === 'type' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 border border-gray-200"
                          >
                            <div className="p-4">
                              <div className="text-xs font-semibold text-gray-500 mb-3">Property Types</div>
                  {[
                                { name: 'Residential', icon: <Home size={16} />, color: 'from-green-400 to-green-600' },
                                { name: 'Commercial', icon: <Building size={16} />, color: 'from-blue-400 to-blue-600' },
                                { name: 'Apartment', icon: <Building size={16} />, color: 'from-purple-400 to-purple-600' },
                                { name: 'Villa', icon: <Home size={16} />, color: 'from-orange-400 to-orange-600' },
                                { name: 'Land', icon: <Square size={16} />, color: 'from-emerald-400 to-emerald-600' },
                  ].map((type) => (
                    <div 
                      key={type.name} 
                                  className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-gray-800 hover:scale-105"
                      onClick={() => handleSelectType(type.name.toLowerCase())}
                    >
                                  <div className={`p-1.5 bg-gradient-to-r ${type.color} rounded-md mr-3`}>
                        {type.icon}
                      </div>
                                  <span className="font-medium">{type.name}</span>
                    </div>
                  ))}
                </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
            </div>

            {/* Budget Field */}
            <div className="relative group">
              <div 
                        className="border-2 border-gray-200 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 transition-all duration-300 bg-white group-hover:shadow-lg"
                onClick={() => toggleDropdown('budget')}
              >
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg mr-3">
                          <DollarSign size={18} className="text-white" />
                </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 font-medium">Budget Range</div>
                          <div className="text-gray-800 font-semibold">
                    {selectedBudget || "Select Budget"}
                  </div>
                </div>
                        <ChevronDown size={18} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
              </div>
              
                      <AnimatePresence>
                        {activeDropdown === 'budget' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 border border-gray-200"
                          >
                            <div className="p-4">
                              <div className="text-xs font-semibold text-gray-500 mb-3">Budget Range</div>
                  {[
                                { range: 'Under 50 Lac', icon: <DollarSign size={16} /> },
                                { range: '50 Lac - 1 Cr', icon: <DollarSign size={16} /> },
                                { range: '1 Cr - 2 Cr', icon: <DollarSign size={16} /> },
                                { range: '2 Cr - 5 Cr', icon: <DollarSign size={16} /> },
                                { range: '5 Cr+', icon: <DollarSign size={16} /> },
                  ].map((budget) => (
                    <div 
                      key={budget.range} 
                                  className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-gray-800 hover:scale-105"
                      onClick={() => handleSelectBudget(budget.range)}
                    >
                                  <div className="p-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md mr-3">
                        {budget.icon}
                      </div>
                                  <span className="font-medium">{budget.range}</span>
                    </div>
                  ))}
                </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
            </div>
            
            {/* Search Input */}
            <div className="relative group">
                      <div className="border-2 border-gray-200 rounded-xl px-4 py-4 flex items-center bg-white group-hover:border-gold-400 transition-all duration-300 group-hover:shadow-lg">
                        <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mr-3">
                          <Search size={18} className="text-white" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search keywords..."
                          className="flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Search Button */}
            <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              onClick={handleSearch}
            >
                    <Search size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Search Properties
                    <Zap size={20} className="ml-2 group-hover:animate-pulse" />
            </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
      </div>
      
        {/* Modern Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-white/95 backdrop-blur-xl border-t border-white/20 py-8 relative z-10 mt-auto"
        >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { number: "8+", label: "Major Cities", icon: <MapPin size={24} className="text-gold-500" /> },
                { number: "500+", label: "Properties", icon: <Home size={24} className="text-gold-500" /> },
                { number: "1.2K+", label: "Happy Clients", icon: <Star size={24} className="text-gold-500" /> },
                { number: "15+", label: "Years Experience", icon: <Award size={24} className="text-gold-500" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + (index * 0.1) }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
            </div>
                  <div className="text-gold-500 font-display text-3xl sm:text-4xl font-bold mb-2">
                    {stat.number}
            </div>
                  <div className="text-gray-700 text-sm sm:text-base font-medium">
                    {stat.label}
            </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
    </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoSource="drive"
        videoUrl="https://drive.google.com/file/d/16Pb_1fz2UsbA2NlRZvKXvdBiWNc2_aqD/preview"
      />
    </>
  );
};

export default Hero;
