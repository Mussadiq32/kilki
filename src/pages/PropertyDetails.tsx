import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MapPin, Home, Square, BadgeIndianRupee, ArrowLeft, Phone, Mail, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import CustomButton from '@/components/ui/CustomButton';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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
  description?: string;
  created_at: string;
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching property with id:', id);
        // Fetch property details
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();
        if (propertyError) throw propertyError;
        setProperty(propertyData);
        // Fetch property images
        const { data: mediaData, error: mediaError } = await supabase
          .from('property_media')
          .select('media_url')
          .eq('property_id', id)
          .eq('media_type', 'image')
          .order('display_order', { ascending: true });
        if (mediaError) {
          console.error('Error fetching images:', mediaError);
        }
        if (mediaData && mediaData.length > 0) {
          setImages(mediaData.map(item => item.media_url));
        } else {
          // Fallback to property image
          setImages([propertyData.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800']);
        }
      } catch (error: any) {
        console.error('Error fetching property:', error);
        setError(error.message || 'Unknown error');
        // navigate('/properties'); // Comment out redirect for debugging
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleContact = () => {
    window.open('https://wa.me/7006064587', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-32 w-full" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-red-700 mb-4">Error Loading Property</h1>
              <p className="text-royal-600 mb-6">{error}</p>
              <CustomButton onClick={() => window.open('/properties', '_blank')}>
                Back to Properties
              </CustomButton>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-royal-800 mb-4">Property Not Found</h1>
              <p className="text-royal-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
              <CustomButton onClick={() => window.open('/properties', '_blank')}>
                Back to Properties
              </CustomButton>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <CustomButton 
              variant="outline" 
              icon={<ArrowLeft size={18} />}
              onClick={() => window.open('/properties', '_blank')}
            >
              Back to Properties
            </CustomButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={images[currentImageIndex] || property.image}
                  alt={property.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-white text-sm font-semibold px-3 py-1 rounded">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <CustomButton
                    variant="outline"
                    size="sm"
                    icon={<Share2 size={16} />}
                    onClick={handleShare}
                  >
                    Share
                  </CustomButton>
                </div>
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                        index === currentImageIndex ? 'opacity-100 ring-2 ring-gold-500' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold text-royal-800 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-royal-600 mb-4">
                  <MapPin size={18} className="text-gold-500 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center text-2xl font-bold text-royal-800">
                  <BadgeIndianRupee size={24} className="text-gold-500 mr-1" />
                  {property.price}
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-royal-100">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Home size={20} className="text-gold-500" />
                  </div>
                  <div className="text-sm text-royal-600">Bedrooms</div>
                  <div className="font-semibold text-royal-800">{property.bedrooms}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Home size={20} className="text-gold-500" />
                  </div>
                  <div className="text-sm text-royal-600">Bathrooms</div>
                  <div className="font-semibold text-royal-800">{property.bathrooms}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Square size={20} className="text-gold-500" />
                  </div>
                  <div className="text-sm text-royal-600">Area</div>
                  <div className="font-semibold text-royal-800">{property.area}</div>
                </div>
              </div>

              {/* Property Type */}
              <div className="bg-royal-50 p-4 rounded-lg">
                <div className="text-sm text-royal-600 mb-1">Property Type</div>
                <div className="font-semibold text-royal-800 capitalize">{property.type}</div>
              </div>

              {/* Description */}
              {property.description && (
                <div>
                  <h3 className="font-semibold text-royal-800 mb-3">Description</h3>
                  <p className="text-royal-600 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Contact Actions */}
              <div className="space-y-4 pt-6 border-t border-royal-100">
                <CustomButton 
                  className="w-full" 
                  icon={<Phone size={18} />}
                  onClick={handleContact}
                >
                  Contact Agent
                </CustomButton>
                <CustomButton 
                  variant="outline" 
                  className="w-full"
                  icon={<Mail size={18} />}
                  onClick={() => window.open('mailto:info@royalrealty.com', '_blank')}
                >
                  Send Email
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="7006064587" />
    </div>
  );
};

export default PropertyDetails; 