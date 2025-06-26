import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from './OptimizedImage';
import { IMAGE_SIZES } from '@/lib/imageOptimization';

interface PropertyImageProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'thumbnail' | 'card' | 'gallery' | 'hero' | 'detail';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const PropertyImage: React.FC<PropertyImageProps> = ({
  src,
  alt,
  className,
  variant = 'card',
  priority = false,
  onLoad,
  onError,
}) => {
  const [hasError, setHasError] = useState(false);
  const fallback = '/placeholder.svg';
  // Define image configurations for different variants
  const getImageConfig = () => {
    switch (variant) {
      case 'thumbnail':
        return {
          sizes: [IMAGE_SIZES.thumbnail],
          quality: 70,
          responsive: false,
          aspectRatio: 'aspect-[4/3]',
        };
      case 'card':
        return {
          sizes: [IMAGE_SIZES.small, IMAGE_SIZES.medium],
          quality: 75,
          responsive: true,
          aspectRatio: '',
          container: 'w-full h-[220px] sm:h-[280px] overflow-hidden rounded-t-2xl sm:rounded-t-3xl',
        };
      case 'gallery':
        return {
          sizes: [IMAGE_SIZES.medium, IMAGE_SIZES.large],
          quality: 80,
          responsive: true,
          aspectRatio: 'aspect-[4/3]',
        };
      case 'hero':
        return {
          sizes: [IMAGE_SIZES.large, IMAGE_SIZES.hero],
          quality: 85,
          responsive: true,
          aspectRatio: 'aspect-[16/9]',
        };
      case 'detail':
        return {
          sizes: [IMAGE_SIZES.medium, IMAGE_SIZES.large],
          quality: 80,
          responsive: true,
          aspectRatio: 'aspect-[4/3]',
        };
      default:
        return {
          sizes: [IMAGE_SIZES.medium],
          quality: 75,
          responsive: false,
          aspectRatio: 'aspect-[4/3]',
          container: '',
        };
    }
  };

  const config = getImageConfig();
  const showFallback = !src || hasError;

  return (
    <div className={cn('relative', config.aspectRatio, config.container, className)}>
      <OptimizedImage
        src={showFallback ? fallback : src}
        alt={alt}
        className="w-full h-full object-cover max-w-full"
        quality={config.quality}
        format="auto"
        responsive={config.responsive}
        priority={priority}
        width={600}
        height={variant === 'card' ? 220 : undefined}
        onLoad={onLoad}
        onError={() => { setHasError(true); onError?.(); }}
      />
    </div>
  );
};

// Specialized components for common use cases
export const PropertyThumbnail: React.FC<Omit<PropertyImageProps, 'variant'>> = (props) => (
  <PropertyImage {...props} variant="thumbnail" />
);

export const PropertyCardImage: React.FC<Omit<PropertyImageProps, 'variant'>> = (props) => (
  <PropertyImage {...props} variant="card" />
);

export const PropertyGalleryImage: React.FC<Omit<PropertyImageProps, 'variant'>> = (props) => (
  <PropertyImage {...props} variant="gallery" />
);

export const PropertyHeroImage: React.FC<Omit<PropertyImageProps, 'variant'>> = (props) => (
  <PropertyImage {...props} variant="hero" />
);

export const PropertyDetailImage: React.FC<Omit<PropertyImageProps, 'variant'>> = (props) => (
  <PropertyImage {...props} variant="detail" />
); 