import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/hooks/usePerformance';
import { 
  useImageOptimization, 
  getOptimizedImageProps, 
  IMAGE_SIZES,
  type OptimizedImageConfig 
} from '@/lib/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'auto';
  responsive?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  placeholder,
  width,
  height,
  priority = false,
  sizes = '100vw',
  quality = 75,
  format = 'auto',
  responsive = false,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Determine image sizes based on responsive prop
  const imageSizes = responsive 
    ? [IMAGE_SIZES.small, IMAGE_SIZES.medium, IMAGE_SIZES.large]
    : [IMAGE_SIZES.medium];
  
  // Use our new image optimization hook
  const optimizationConfig: OptimizedImageConfig = {
    src,
    alt,
    sizes: imageSizes,
    quality,
    format,
    lazy: !priority,
    priority,
  };
  
  const { isLoaded: optimizedLoaded, hasError: optimizedError, optimizedProps } = useImageOptimization(optimizationConfig);
  
  // Use lazy loading hook for better performance
  const { imageSrc, isLoaded, error } = useLazyImage(src, placeholder);

  useEffect(() => {
    if (optimizedLoaded || isLoaded) {
      setIsLoading(false);
      onLoad?.();
    }
    if (optimizedError || error) {
      setHasError(true);
      onError?.();
    }
  }, [optimizedLoaded, optimizedError, isLoaded, error, onLoad, onError]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = optimizedProps.src;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [optimizedProps.src, priority]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {placeholder && isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        {...optimizedProps}
        width={width}
        height={height}
        sizes={responsive ? optimizedProps.sizes : sizes}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError ? 'opacity-50' : '',
          'w-full h-auto object-cover'
        )}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
        style={{
          willChange: 'opacity',
        }}
      />
      
      {/* Loading indicator */}
      {isLoading && !placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            </div>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 