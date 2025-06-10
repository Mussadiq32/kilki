import React, { useState, useEffect } from 'react';
import PropertyCard from './ui/PropertyCard';
import PropertySearch from './ui/PropertySearch';
import CustomButton from './ui/CustomButton';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching properties:', error);
          return;
        }

        setProperties(data || []);
        setFilteredProperties(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const handleSearch = () => {
    // Search is handled automatically by the useEffect above
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <PropertySearch
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search for properties..."
          useGoogleRedirect={false}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={40} className="animate-spin text-gold-500" />
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-4">
            <Search size={50} className="mx-auto text-royal-300" />
          </div>
          <h3 className="text-2xl font-display font-medium text-royal-700 mb-2">
            {searchTerm ? 'No Properties Found' : 'No Properties Available'}
          </h3>
          <p className="text-royal-500 max-w-md mx-auto mb-6">
            {searchTerm 
              ? 'No properties match your search criteria. Try different keywords.'
              : 'No properties are currently available in our database.'
            }
          </p>
          {searchTerm && (
            <CustomButton 
              onClick={() => setSearchTerm('')} 
              variant="primary"
            >
              Clear Search
            </CustomButton>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              image={property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'}
              featured={property.featured}
              type={property.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
