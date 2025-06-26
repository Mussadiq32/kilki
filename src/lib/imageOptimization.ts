// Image optimization utilities for real estate website

export interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  sizes?: ImageSize[];
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'auto';
  lazy?: boolean;
  priority?: boolean;
}

// Predefined image sizes for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200, suffix: 'thumbnail' },
  small: { width: 600, height: 400, suffix: 'small' },
  medium: { width: 1200, height: 800, suffix: 'medium' },
  large: { width: 1920, height: 1080, suffix: 'large' },
  hero: { width: 1920, height: 600, suffix: 'hero' },
} as const;

// Responsive breakpoints for different screen sizes
export const RESPONSIVE_SIZES = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
} as const;

/**
 * Check if WebP is supported in the browser
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
}

/**
 * Check if AVIF is supported in the browser
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('image/avif') === 5;
}

/**
 * Get the best image format based on browser support
 */
export function getBestFormat(): 'webp' | 'avif' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

/**
 * Generate optimized image URL with WebP conversion
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  size?: ImageSize,
  format?: 'webp' | 'avif' | 'jpeg' | 'auto',
  quality: number = 80
): string {
  // If it's already a data URL or blob, return as is
  if (originalUrl.startsWith('data:') || originalUrl.startsWith('blob:')) {
    return originalUrl;
  }

  // If it's an external URL (like Unsplash), try to optimize it
  if (originalUrl.includes('unsplash.com')) {
    const url = new URL(originalUrl);
    if (size) {
      url.searchParams.set('w', size.width.toString());
      url.searchParams.set('h', size.height.toString());
      url.searchParams.set('fit', 'crop');
    }
    url.searchParams.set('q', quality.toString());
    if (format === 'webp' || (format === 'auto' && supportsWebP())) {
      url.searchParams.set('fm', 'webp');
    }
    return url.toString();
  }

  // For local images, check if optimized versions exist
  if (originalUrl.startsWith('/')) {
    const bestFormat = format === 'auto' ? getBestFormat() : format || 'webp';
    const basePath = originalUrl.replace(/\.[^/.]+$/, ''); // Remove extension
    
    if (size) {
      return `${basePath}-${size.suffix}.${bestFormat}`;
    }
    
    return `${basePath}.${bestFormat}`;
  }

  // For other external URLs, return as is
  return originalUrl;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  originalUrl: string,
  sizes: ImageSize[],
  format?: 'webp' | 'avif' | 'jpeg' | 'auto'
): string {
  const bestFormat = format === 'auto' ? getBestFormat() : format || 'webp';
  
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(originalUrl, size, bestFormat);
      return `${optimizedUrl} ${size.width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(sizes: ImageSize[]): string {
  return sizes
    .map((size, index) => {
      if (index === sizes.length - 1) {
        return `${size.width}px`;
      }
      return `(max-width: ${size.width}px) ${size.width}px`;
    })
    .join(', ');
}

/**
 * Create a low-quality image placeholder (LQIP)
 */
export function createLQIP(originalUrl: string): string {
  // For now, return a simple placeholder
  // In a real implementation, you might want to generate actual LQIPs
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E`;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Generate optimized image props for React
 */
export function getOptimizedImageProps(config: OptimizedImageConfig) {
  const {
    src,
    alt,
    sizes = [IMAGE_SIZES.medium],
    quality = 80,
    format = 'auto',
    lazy = true,
    priority = false,
  } = config;

  const bestFormat = format === 'auto' ? getBestFormat() : format;
  const optimizedSrc = getOptimizedImageUrl(src, sizes[0], bestFormat, quality);
  
  const props: any = {
    src: optimizedSrc,
    alt,
    loading: priority ? 'eager' : lazy ? 'lazy' : 'eager',
    decoding: 'async',
  };

  // Add responsive image support if multiple sizes provided
  if (sizes.length > 1) {
    props.srcSet = generateSrcSet(src, sizes, bestFormat);
    props.sizes = generateSizes(sizes);
  }

  return props;
}

/**
 * Hook for image optimization
 */
export function useImageOptimization(config: OptimizedImageConfig) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    const optimizedProps = getOptimizedImageProps(config);
    setCurrentSrc(optimizedProps.src);
  }, [config.src, config.sizes, config.quality, config.format]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  return {
    isLoaded,
    hasError,
    currentSrc,
    handleLoad,
    handleError,
    optimizedProps: getOptimizedImageProps(config),
  };
}

// Import React hooks
import { useState, useEffect, useCallback } from 'react'; 