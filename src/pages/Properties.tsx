import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PropertySearch from '@/components/ui/PropertySearch';
import PropertyCard from '@/components/ui/PropertyCard';
import CustomButton from '@/components/ui/CustomButton';
import { MapPin, Home, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
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

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get search parameters from URL
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || 'all';
  const type = searchParams.get('type') || 'all';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  // Local state for form inputs
  const [localQuery, setLocalQuery] = useState(query);
  const [localLocation, setLocalLocation] = useState(location);
  const [localType, setLocalType] = useState(type);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties",
          variant: "destructive",
        });
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Update local state when URL params change
  useEffect(() => {
    setLocalQuery(query);
    setLocalLocation(location);
    setLocalType(type);
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [query, location, type, minPrice, maxPrice]);

  useEffect(() => {
    // Filter properties based on current filters
    let filtered = properties;

    if (query) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location !== 'all') {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter(property => property.type === type);
    }

    if (minPrice) {
      filtered = filtered.filter(property => {
        const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        return price >= minPrice;
      });
    }

    if (maxPrice) {
      filtered = filtered.filter(property => {
        const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        return price <= maxPrice;
      });
    }

    setFilteredProperties(filtered);
  }, [properties, query, location, type, minPrice, maxPrice]);

  const handleSearch = () => {
    // Update URL parameters with current search values
    const newSearchParams = new URLSearchParams();
    
    if (localQuery) {
      newSearchParams.set('query', localQuery);
    }
    
    if (localLocation !== 'all') {
      newSearchParams.set('location', localLocation);
    }
    
    if (localType !== 'all') {
      newSearchParams.set('type', localType);
    }
    
    if (localMinPrice) {
      newSearchParams.set('minPrice', localMinPrice.toString());
    }
    
    if (localMaxPrice) {
      newSearchParams.set('maxPrice', localMaxPrice.toString());
    }
    
    setSearchParams(newSearchParams);
    
    toast({
      title: "Search Updated",
      description: `Found ${filteredProperties.length} properties matching your criteria`,
    });
  };

  const handleResetFilters = () => {
    setLocalQuery('');
    setLocalLocation('all');
    setLocalMinPrice(undefined);
    setLocalMaxPrice(undefined);
    setLocalType('all');
    setSearchParams({});
    
    toast({
      title: "Filters Reset",
      description: "All search filters have been cleared",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-royal-50 pt-28 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-royal-800 font-semibold leading-tight mb-6">
                Find Your Perfect <span className="text-gold-500">Property</span>
              </h1>
              <p className="text-royal-600 text-lg mb-8 max-w-2xl">
                Discover our collection of premium properties with real-time updates from our database.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8 border-b">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              <div className="lg:col-span-2">
                <PropertySearch 
                  value={localQuery}
                  onChange={setLocalQuery}
                  onSearch={handleSearch}
                  placeholder="Search properties..."
                  useGoogleRedirect={false}
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Locations</option>
                    <option value="Srinagar">Srinagar</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={localType}
                    onChange={(e) => setLocalType(e.target.value as 'residential' | 'commercial' | 'all')}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localMinPrice || ''}
                  onChange={(e) => setLocalMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              
              <div className="lg:col-span-1">
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localMaxPrice || ''}
                  onChange={(e) => setLocalMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-royal-600">
                {loading ? 'Loading...' : `${filteredProperties.length} properties found`}
              </p>
              <div className="flex gap-2">
                <CustomButton
                  onClick={handleSearch}
                  variant="primary"
                  icon={<Search size={18} />}
                >
                  Search
                </CustomButton>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center text-royal-600 hover:text-royal-800 text-sm px-3 py-2 rounded-lg hover:bg-royal-50"
                >
                  <X size={16} className="mr-1" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-4">
                  <Search size={50} className="mx-auto text-royal-300" />
                </div>
                <h3 className="text-2xl font-display font-medium text-royal-700 mb-2">No Properties Found</h3>
                <p className="text-royal-500 max-w-md mx-auto mb-6">
                  No properties match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <CustomButton onClick={handleResetFilters} variant="primary">
                  Reset Filters
                </CustomButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+917006064587" />
    </div>
  );
};

export default Properties;
