import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../ui/PropertyCard';
import CustomButton from '../ui/CustomButton';
import { ArrowRight, Sparkles, Crown, Building2, Home, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: 'residential' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  created_at: string;
}

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProperties(data as Property[]);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProperties();
    
    // Set up realtime subscription to refresh properties when changes occur
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        () => {
          console.log('Property table change detected, refreshing data...');
          fetchProperties();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProperties = 
    activeTab === 'all' 
      ? properties 
      : properties.filter(property => property.type === activeTab);

  const handleViewAllProperties = () => {
    window.open('/properties', '_blank');
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-royal-50 to-gold-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-pattern-light opacity-50 z-0"></div>

      <div className="container mx-auto relative z-10 px-2 sm:px-4 md:px-8">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl shadow-lg">
                <Crown size={24} className="text-white" />
              </div>
              <h2 className="heading-lg text-royal-800 mb-0 animate-fade-up text-3xl sm:text-4xl md:text-5xl font-bold">
                Featured <span className="bg-gradient-to-r from-gold-500 to-royal-600 bg-clip-text text-transparent">Properties</span>
              </h2>
            </div>
            <p className="text-royal-600 animate-fade-up animate-delay-200 text-base sm:text-lg leading-relaxed">
              Discover our handpicked selection of premium properties across India's most vibrant cities, featuring unmatched quality and exceptional value.
            </p>
            
            {/* Stats Summary */}
            <div className="flex flex-wrap items-center gap-6 mt-6 animate-fade-up animate-delay-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></div>
                <span className="text-sm font-medium text-royal-700">
                  {properties.length}+ Properties
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-royal-400 to-royal-600 rounded-full"></div>
                <span className="text-sm font-medium text-royal-700">
                  Premium Quality
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-royal-700">
                  Verified Listings
                </span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Filter Tabs */}
          <div className="flex flex-wrap mt-6 sm:mt-8 lg:mt-0 animate-fade-up animate-delay-400 gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`relative group px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/25' 
                  : 'bg-white/80 backdrop-blur-sm text-royal-700 hover:bg-white hover:shadow-lg border border-white/20'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Sparkles size={16} className={activeTab === 'all' ? 'text-white' : 'text-gold-500'} />
                <span>All Properties</span>
              </span>
              {activeTab === 'all' && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`relative group px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'residential' 
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/25' 
                  : 'bg-white/80 backdrop-blur-sm text-royal-700 hover:bg-white hover:shadow-lg border border-white/20'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Home size={16} className={activeTab === 'residential' ? 'text-white' : 'text-royal-500'} />
                <span>Residential</span>
              </span>
              {activeTab === 'residential' && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`relative group px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'commercial' 
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/25' 
                  : 'bg-white/80 backdrop-blur-sm text-royal-700 hover:bg-white hover:shadow-lg border border-white/20'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Building2 size={16} className={activeTab === 'commercial' ? 'text-white' : 'text-green-500'} />
                <span>Commercial</span>
              </span>
              {activeTab === 'commercial' && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Property Cards Grid/Carousel */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[400px] w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-royal-100 to-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 size={32} className="text-royal-400" />
              </div>
              <h3 className="text-xl font-semibold text-royal-800 mb-2">No Properties Found</h3>
              <p className="text-royal-600 text-sm sm:text-base">Check back soon for new premium listings!</p>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="mySwiper !pb-10" // Added padding-bottom to prevent pagination from overlapping cards
          >
            {filteredProperties.map((property, index) => (
              <SwiperSlide key={property.id} className="pb-4"> {/* Added padding-bottom to individual slides */}
              <div 
                  className="animate-fade-up group h-full"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                  <div className="relative h-full flex flex-col">
                  <PropertyCard 
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    image={property.image}
                    featured={property.featured}
                    type={property.type}
                  />
                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        
        {/* Enhanced CTA Section */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-up animate-delay-500">
            <CustomButton 
              onClick={handleViewAllProperties}
            className="group px-8 py-4 bg-gradient-to-r from-royal-500 to-royal-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base font-semibold"
            >
            <span className="flex items-center space-x-3">
              <span>Explore All Listings</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
