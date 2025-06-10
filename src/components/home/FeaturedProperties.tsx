import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../ui/PropertyCard';
import CustomButton from '../ui/CustomButton';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

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
    <section id="featured" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-royal-800 mb-3 sm:mb-4 animate-fade-up text-2xl sm:text-3xl md:text-4xl">
              Featured <span className="text-gradient">Properties</span>
            </h2>
            <p className="text-royal-600 animate-fade-up animate-delay-200 text-sm sm:text-base">
              Discover our handpicked selection of premium properties across India's most vibrant cities, featuring unmatched quality and exceptional value.
            </p>
          </div>
          
          <div className="flex flex-wrap mt-4 sm:mt-6 lg:mt-0 animate-fade-up animate-delay-300 gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm mr-0 sm:mr-2 transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm mr-0 sm:mr-2 transition-all duration-300 ${
                activeTab === 'residential' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'commercial' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-[180px] sm:h-[200px] w-full rounded-lg" />
                <Skeleton className="h-5 sm:h-6 w-3/4" />
                <Skeleton className="h-3 sm:h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
                  <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
                  <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
                </div>
                <Skeleton className="h-5 sm:h-6 w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-royal-600 text-sm sm:text-base">No properties found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
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
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-8 sm:mt-12 animate-fade-up animate-delay-500">
          <CustomButton 
            variant="outline" 
            icon={<ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />} 
            iconPosition="right"
            onClick={handleViewAllProperties}
            className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            View All Properties
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
