import { useState, useEffect } from 'react';
import { Heart, Home, MapPin, Square, BadgeIndianRupee, Sparkles, Crown, Star } from 'lucide-react';
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
        console.error('Error fetching primary image:', error);
        // Fallback to the original image prop
        setPrimaryImage(image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800');
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
        "group relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm property-card-shadow h-full border border-white/20 hover:border-gold-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-2",
        featured ? "md:col-span-2 ring-2 ring-gold-200/50" : "",
        className
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 via-white to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        {/* Enhanced Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-royal-100 to-gold-100">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-royal-200 to-gold-200 animate-pulse",
            imageLoaded ? "opacity-0" : "opacity-100"
          )} />
          <img
            src={displayImage}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
          
          {/* Enhanced Like Button */}
          <button
            onClick={handleLikeToggle}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 group/like"
            aria-label="Like property"
          >
            <Heart size={20} className={cn(
              "transition-all duration-300 group-hover/like:scale-110",
              isLiked ? "fill-rose-500 text-rose-500" : "text-royal-800 group-hover/like:text-rose-500"
            )} />
          </button>
          
          {/* Enhanced Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-1">
              <Crown size={12} className="text-white" />
              <span>Featured</span>
            </div>
          )}
          
          {/* Enhanced Type Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20">
            <div className="flex items-center space-x-2">
              {type === 'residential' ? (
                <Home size={14} className="text-gold-400" />
              ) : (
                <Square size={14} className="text-gold-400" />
              )}
              <span>{type === 'residential' ? 'Residential' : 'Commercial'}</span>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Enhanced Content Section */}
        <div className="p-6 relative">
          {/* Title with enhanced styling */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display text-xl font-bold text-royal-800 line-clamp-2 group-hover:text-royal-900 transition-colors duration-300">{title}</h3>
          </div>
          
          {/* Location with enhanced styling */}
          <div className="flex items-center text-royal-600 mb-5 group-hover:text-royal-700 transition-colors duration-300">
            <div className="p-1.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg mr-2">
              <MapPin size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium">{location}</span>
          </div>
          
          {/* Property Details with enhanced styling */}
          <div className="flex items-center justify-between border-t border-royal-100/50 pt-4 mb-5">
            <div className="flex space-x-4">
              <div className="flex items-center text-royal-700 group-hover:text-royal-800 transition-colors duration-300">
                <div className="p-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mr-2">
                  <Home size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium">{bedrooms} bd</span>
              </div>
              <div className="flex items-center text-royal-700 group-hover:text-royal-800 transition-colors duration-300">
                <div className="p-1 bg-gradient-to-r from-green-400 to-green-600 rounded-lg mr-2">
                  <Home size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium">{bathrooms} ba</span>
              </div>
              <div className="flex items-center text-royal-700 group-hover:text-royal-800 transition-colors duration-300">
                <div className="p-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mr-2">
                  <Square size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium">{area}</span>
              </div>
            </div>
          </div>
          
          {/* Price with enhanced styling */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-1.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg mr-2">
                <BadgeIndianRupee size={16} className="text-white" />
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-gold-600 to-royal-600 bg-clip-text text-transparent">{price}</span>
            </div>
            
            {/* Rating/Quality indicator */}
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <Star size={14} className="text-gold-400 fill-gold-400" />
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <button
            className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 hover:scale-105 group-hover:shadow-xl group-hover:shadow-gold-500/30 flex items-center justify-center space-x-2"
            onClick={() => window.open(`/properties/${id}`, '_blank')}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>View Details</span>
          </button>
        </div>
      </div>
      
      {/* Corner accent for featured properties */}
      {featured && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-gold-400"></div>
      )}
    </div>
  );
};

export default PropertyCard;
