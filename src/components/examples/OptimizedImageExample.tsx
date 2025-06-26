import React from 'react';
import { PropertyCardImage, PropertyDetailImage, PropertyGalleryImage, PropertyHeroImage, PropertyThumbnail } from '@/components/ui/PropertyImage';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { IMAGE_SIZES } from '@/lib/imageOptimization';

const OptimizedImageExample: React.FC = () => {
  const sampleImages = [
    '/images/test-property.svg',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  ];

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Image Optimization Examples
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          This page demonstrates the different image optimization variants available for your real estate website.
          Each variant is optimized for specific use cases and screen sizes.
        </p>
      </div>

      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Hero Images</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sampleImages.slice(0, 2).map((src, index) => (
            <div key={index} className="space-y-2">
              <PropertyHeroImage
                src={src}
                alt={`Hero property ${index + 1}`}
                priority={index === 0} // First image loads immediately
              />
              <p className="text-sm text-gray-600">
                Hero variant - Optimized for large displays with high quality
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Property Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleImages.map((src, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <PropertyCardImage
                src={src}
                alt={`Property card ${index + 1}`}
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Property {index + 1}</h3>
                <p className="text-sm text-gray-600">Card variant - Responsive with medium quality</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thumbnails */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Thumbnails</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sampleImages.map((src, index) => (
            <div key={index} className="space-y-2">
              <PropertyThumbnail
                src={src}
                alt={`Thumbnail ${index + 1}`}
              />
              <p className="text-xs text-gray-600 text-center">
                Thumbnail variant - Small size, fast loading
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Image Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleImages.map((src, index) => (
            <div key={index} className="space-y-2">
              <PropertyGalleryImage
                src={src}
                alt={`Gallery image ${index + 1}`}
              />
              <p className="text-sm text-gray-600">
                Gallery variant - High quality for detailed viewing
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail View */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Property Detail View</h2>
        <div className="space-y-4">
          {sampleImages.map((src, index) => (
            <div key={index} className="space-y-2">
              <PropertyDetailImage
                src={src}
                alt={`Detail image ${index + 1}`}
                priority={index === 0}
              />
              <p className="text-sm text-gray-600">
                Detail variant - Optimized for property detail pages
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Optimization */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Custom Optimization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <OptimizedImage
              src={sampleImages[0]}
              alt="Custom optimized image"
              quality={85}
              format="webp"
              responsive={true}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-600">
              Custom optimization - WebP format, 85% quality, responsive
            </p>
          </div>
          <div className="space-y-2">
            <OptimizedImage
              src={sampleImages[1]}
              alt="High priority image"
              quality={90}
              format="auto"
              priority={true}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-600">
              High priority - Auto format detection, 90% quality, eager loading
            </p>
          </div>
        </div>
      </section>

      {/* Performance Information */}
      <section className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Performance Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">25-35%</div>
            <p className="text-sm text-gray-600">Smaller file sizes with WebP</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50%+</div>
            <p className="text-sm text-gray-600">Faster loading on mobile</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <p className="text-sm text-gray-600">Browser compatibility</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>
            The image optimization system automatically detects browser support and serves the best format available.
            Modern browsers get WebP images, while older browsers receive optimized JPEG fallbacks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OptimizedImageExample; 