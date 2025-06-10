import { useState, useEffect } from 'react';
import PropertyCard from '../ui/PropertyCard';
import CustomButton from '../ui/CustomButton';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const PremiumProperties = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
    // Optionally add realtime updates as in FeaturedProperties
  }, []);

  const filteredProperties =
    activeTab === 'all'
      ? properties.filter(p => p.featured) // Only show featured/premium
      : properties.filter(p => p.featured && p.type === activeTab);

  return (
    <section id="premium" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-royal-800 mb-4 animate-fade-up">
              Premium <span className="text-gradient">Properties</span>
            </h2>
            <p className="text-royal-600 animate-fade-up animate-delay-200">
              Discover our handpicked selection of premium properties across India's most vibrant cities, featuring unmatched quality and exceptional value.
            </p>
          </div>
          
          <div className="flex mt-6 md:mt-0 animate-fade-up animate-delay-300">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm mr-2 transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-4 py-2 rounded-full text-sm mr-2 transition-all duration-300 ${
                activeTab === 'residential' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-[200px] w-full rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-12 animate-fade-up animate-delay-500">
          <CustomButton 
            variant="outline" 
            icon={<ArrowRight size={18} />} 
            iconPosition="right"
            onClick={() => window.open('/properties', '_blank')}
          >
            View All Properties
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default PremiumProperties;
