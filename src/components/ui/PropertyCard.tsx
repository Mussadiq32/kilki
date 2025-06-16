import { useState, useEffect } from 'react';
import { Heart, Home, MapPin, Square, BadgeIndianRupee, Sparkles, Crown, Star, Building2, ShowerHead, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  className?: string;
  featured?: boolean;
  type?: 'residential' | 'commercial';
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  className,
  featured = false,
  type = 'residential'
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(image);

  useEffect(() => {
    const fetchPrimaryImage = async () => {
      try {
        const { data, error } = await supabase
          .from('property_media')
          .select('media_url')
          .eq('property_id', parseInt(id))
          .eq('media_type', 'image')
          .eq('is_primary', true)
          .single();
        
        if (data && !error) {
          setPrimaryImage(data.media_url);
        } else {
          // If no primary image, get the first image
          const { data: firstImage } = await supabase
            .from('property_media')
            .select('media_url')
            .eq('property_id', parseInt(id))
            .eq('media_type', 'image')
            .order('display_order', { ascending: true })
            .limit(1)
            .single();
          
          if (firstImage) {
            setPrimaryImage(firstImage.media_url);
          }
        }
      } catch (error) {
        console.error('Error fetching primary image:', error, 'for property_id:', id);
        // Fallback to a local placeholder or a more generic property image
        setPrimaryImage(image || '/placeholder.svg'); // Assuming you have a placeholder.svg in your public folder
      }
    };

    if (id) {
      fetchPrimaryImage();
    }
  }, [id, image]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const displayImage = primaryImage || image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800';

  return (
    <div 
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md property-card-shadow-modern h-full border border-gray-100/50 hover:border-gold-300/70 transition-all duration-500 hover:shadow-3xl hover:shadow-gold-500/15 hover:-translate-y-2",
        featured ? "ring-3 ring-gold-300/70" : "",
        className
      )}
    >
      {/* Subtle animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50/70 via-white to-royal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative">
        {/* Modern Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl bg-gray-50">
          {/* Image placeholder/skeleton */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse",
            imageLoaded ? "opacity-0" : "opacity-100"
          )} />
          <img
            src={displayImage}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
          
          {/* Modern Like Button */}
          <button
            onClick={handleLikeToggle}
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-105 group/like"
            aria-label="Like property"
          >
            <Heart size={22} className={cn(
              "transition-all duration-300 group-hover/like:scale-110",
              isLiked ? "fill-rose-500 text-rose-500" : "text-gray-600 group-hover/like:text-rose-500"
            )} />
          </button>
          
          {/* Modern Featured Badge */}
          {featured && (
            <div className="absolute top-5 left-5 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md flex items-center space-x-1.5">
              <Sparkles size={14} className="text-white" />
              <span>Featured</span>
            </div>
          )}
          
          {/* Modern Type Badge */}
          <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white text-sm font-medium px-4 py-2.5 rounded-full border border-white/20">
            <div className="flex items-center space-x-2">
              {type === 'residential' ? (
                <Home size={15} className="text-gold-300" />
              ) : (
                <Building2 size={15} className="text-gold-300" />
              )}
              <span>{type === 'residential' ? 'Residential' : 'Commercial'}</span>
            </div>
          </div>
          
          {/* Darker hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Modern Content Section */}
        <div className="p-7 relative">
          {/* Title with modern styling */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display text-2xl font-bold text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">{title}</h3>
          </div>
          
          {/* Location with modern styling */}
          <div className="flex items-center text-gray-600 mb-5 group-hover:text-gray-700 transition-colors duration-300">
            <div className="p-1.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg mr-2">
              <MapPin size={15} className="text-white" />
            </div>
            <span className="text-base font-medium">{location}</span>
          </div>
          
          {/* Property Details with modern styling */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-5 mb-6">
            <div className="flex space-x-5">
              <div className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                <Home size={16} className="text-royal-500 mr-2" />
                <span className="text-sm font-medium">{bedrooms} BHK</span>
              </div>
              <div className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                <ShowerHead size={16} className="text-green-500 mr-2" />
                <span className="text-sm font-medium">{bathrooms} Baths</span>
              </div>
              <div className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                <Maximize size={16} className="text-purple-500 mr-2" />
                <span className="text-sm font-medium">{area}</span>
              </div>
            </div>
          </div>
          
          {/* Price with modern styling */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl mr-2">
                <BadgeIndianRupee size={18} className="text-white" />
              </div>
              <span className="font-display text-3xl font-extrabold bg-gradient-to-r from-gold-600 to-royal-700 bg-clip-text text-transparent">{price}</span>
            </div>
            
            {/* Rating/Quality indicator - slightly refined */}
            <div className="flex items-center space-x-1">
              <Star size={15} className="text-gold-400 fill-gold-400" />
              <Star size={15} className="text-gold-400 fill-gold-400" />
              <Star size={15} className="text-gold-400 fill-gold-400" />
              <Star size={15} className="text-gold-400 fill-gold-400" />
              <Star size={15} className="text-gold-300 fill-gold-300" />
            </div>
          </div>
          
          {/* Modern CTA Button */}
          <button
            className="w-full bg-gradient-to-r from-royal-600 to-royal-800 hover:from-royal-700 hover:to-royal-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-royal-500/25 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-royal-500/30 flex items-center justify-center space-x-2 text-lg"
            onClick={() => window.open(`/properties/${id}`, '_blank')}
          >
            <Sparkles size={18} className="animate-pulse" />
            <span>View Details</span>
          </button>
        </div>
      </div>
      
      {/* Corner accent for featured properties - refined */}
      {featured && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-gold-500"></div>
      )}
    </div>
  );
};

export default PropertyCard;
