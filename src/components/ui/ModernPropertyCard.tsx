import { useState, useEffect } from 'react';
import { Heart, Home, MapPin, Square, BadgeIndianRupee, Sparkles, Crown, Star, Building2, ShowerHead, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { PropertyCardImage } from './PropertyImage';

interface ModernPropertyCardProps {
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
  priority?: boolean;
}

const ModernPropertyCard = ({
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
  type = 'residential',
  priority = false
}: ModernPropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(image);
  const [hasImageError, setHasImageError] = useState(false);

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
      } catch {
        setPrimaryImage(image || '/placeholder.svg');
      }
    };
    if (id) fetchPrimaryImage();
  }, [id, image]);

  useEffect(() => {
    setHasImageError(false);
  }, [primaryImage]);

  const handleLikeToggle = () => setIsLiked(!isLiked);
  const displayImage = !hasImageError && primaryImage && primaryImage.trim() !== '' ? primaryImage : '/placeholder.svg';

  return (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden bg-white/30 backdrop-blur-xl shadow-xl border border-gold-100/60 hover:shadow-2xl hover:scale-[1.025] transition-all duration-500 group flex flex-col min-h-[420px]',
        className
      )}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 6px 0 rgba(191,161,74,0.08)' }}
    >
      {/* Image with overlay */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ minHeight: '100%', minWidth: '100%' }}
          loading={priority ? 'eager' : 'lazy'}
          onError={e => {
            if (e.currentTarget.src !== '/placeholder.svg') {
              e.currentTarget.src = '/placeholder.svg';
            }
            setHasImageError(true);
          }}
        />
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* Like button */}
        <button
          onClick={handleLikeToggle}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 z-10"
          aria-label="Like property"
        >
          <Heart size={20} className={cn('transition-all duration-300', isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-600 hover:text-rose-500')} />
        </button>
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1.5 z-10">
            <Crown size={13} className="text-white" />
            <span>Premium</span>
          </div>
        )}
        {/* Type badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 z-10">
          <div className="flex items-center space-x-1.5">
            {type === 'residential' ? <Home size={13} className="text-gold-300" /> : <Building2 size={13} className="text-gold-300" />}
            <span>{type === 'residential' ? 'Residential' : 'Commercial'}</span>
          </div>
        </div>
      </div>
      {/* Card content */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-7">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gold-700 transition-colors duration-300">{title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={15} className="text-gold-400 mr-2" />
            <span className="text-xs sm:text-sm font-medium">{location}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-700">
                <Home size={13} className="text-royal-500 mr-1" />
                <span className="text-xs font-medium">{bedrooms} BHK</span>
              </div>
              <div className="flex items-center text-gray-700">
                <ShowerHead size={13} className="text-green-500 mr-1" />
                <span className="text-xs font-medium">{bathrooms} Bath</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Maximize size={13} className="text-purple-500 mr-1" />
                <span className="text-xs font-medium">{area}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={13} className="text-gold-400 fill-gold-400" />
              <Star size={13} className="text-gold-400 fill-gold-400" />
              <Star size={13} className="text-gold-400 fill-gold-400" />
              <Star size={13} className="text-gold-400 fill-gold-400" />
              <Star size={13} className="text-gold-300 fill-gold-300" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <BadgeIndianRupee size={18} className="text-gold-500 mr-1.5" />
            <span className="font-display text-2xl font-extrabold bg-gradient-to-r from-gold-600 to-royal-700 bg-clip-text text-transparent">{price}</span>
          </div>
          <button
            className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal-600 to-gold-500 hover:from-gold-600 hover:to-royal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
            onClick={() => window.open(`/properties/${id}`, '_blank')}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernPropertyCard; 