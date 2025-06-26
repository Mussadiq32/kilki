# Image Optimization Guide for Real Estate Website

This guide explains how to optimize property images for faster loading on mobile devices using WebP conversion and automatic resizing.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Optimize Existing Images

```bash
npm run optimize-images
```

This will:
- Convert all images in `public/images/` to WebP format
- Create multiple sizes for responsive design
- Optimize quality for web delivery

### 3. Use Optimized Images in Components

```tsx
import { PropertyCardImage, PropertyDetailImage } from '@/components/ui/PropertyImage';

// For property cards
<PropertyCardImage 
  src="/images/property1.jpg" 
  alt="Beautiful property" 
/>

// For detailed views
<PropertyDetailImage 
  src="/images/property1.jpg" 
  alt="Beautiful property" 
  priority={true}
/>
```

## 📁 File Structure

```
public/
├── images/                    # Original images
│   ├── property1.jpg
│   └── property2.png
└── images/optimized/         # Optimized images (auto-generated)
    ├── property1.webp
    ├── property1-small.webp
    ├── property1-medium.webp
    └── property1-large.webp
```

## 🎯 Image Variants

The system provides different image variants optimized for specific use cases:

### 1. Thumbnail (`thumbnail`)
- **Size**: 300x200px
- **Quality**: 70%
- **Use**: Small previews, lists
- **Format**: WebP

### 2. Card (`card`)
- **Size**: 600x400px (small), 1200x800px (medium)
- **Quality**: 75%
- **Use**: Property cards, grid layouts
- **Format**: WebP with responsive srcset

### 3. Gallery (`gallery`)
- **Size**: 1200x800px (medium), 1920x1080px (large)
- **Quality**: 80%
- **Use**: Image galleries, lightboxes
- **Format**: WebP with responsive srcset

### 4. Hero (`hero`)
- **Size**: 1920x1080px (large), 1920x600px (hero)
- **Quality**: 85%
- **Use**: Hero sections, banners
- **Format**: WebP with responsive srcset

### 5. Detail (`detail`)
- **Size**: 1200x800px (medium), 1920x1080px (large)
- **Quality**: 80%
- **Use**: Property detail pages
- **Format**: WebP with responsive srcset

## 🔧 Configuration

### Image Optimization Script

The optimization script (`scripts/optimize-images.js`) can be customized:

```javascript
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  sizes: {
    thumbnail: { width: 300, height: 200 },
    small: { width: 600, height: 400 },
    medium: { width: 1200, height: 800 },
    large: { width: 1920, height: 1080 },
  },
  quality: 80,
  formats: ['webp', 'avif'],
};
```

### Vite Configuration

The build process automatically optimizes images using `vite-plugin-imagemin`:

```typescript
ViteImageOptimizer({
  test: /\.(jpe?g|png|gif|tiff|webp|svg)$/i,
  includePublicDir: true,
  webp: {
    quality: 80,
    effort: 6,
  },
  mozjpeg: {
    quality: 80,
    progressive: true,
  },
  // ... more options
})
```

## 📱 Mobile Optimization

### Responsive Images

The system automatically generates responsive images with appropriate `srcset` and `sizes` attributes:

```tsx
<PropertyCardImage 
  src="/images/property1.jpg" 
  alt="Property" 
  responsive={true}  // Enables responsive images
/>
```

### Lazy Loading

Images are automatically lazy-loaded for better performance:

```tsx
<PropertyImage 
  src="/images/property1.jpg" 
  alt="Property" 
  priority={false}  // Enables lazy loading
/>
```

### WebP Support

The system automatically detects browser support and serves WebP images when available:

- **Modern browsers**: WebP format
- **Older browsers**: JPEG fallback
- **AVIF support**: Future-ready with AVIF format

## 🎨 Usage Examples

### Property Card Component

```tsx
import { PropertyCardImage } from '@/components/ui/PropertyImage';

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <PropertyCardImage 
      src={property.image} 
      alt={property.title}
    />
    {/* ... rest of card content */}
  </div>
);
```

### Property Detail Page

```tsx
import { PropertyDetailImage } from '@/components/ui/PropertyImage';

const PropertyDetails = ({ property }) => (
  <div className="property-details">
    <PropertyDetailImage 
      src={property.image} 
      alt={property.title}
      priority={true}  // Load immediately for above-the-fold content
    />
    {/* ... rest of details */}
  </div>
);
```

### Image Gallery

```tsx
import { PropertyGalleryImage } from '@/components/ui/PropertyImage';

const ImageGallery = ({ images }) => (
  <div className="gallery">
    {images.map((image, index) => (
      <PropertyGalleryImage 
        key={index}
        src={image.url} 
        alt={image.alt}
      />
    ))}
  </div>
);
```

## 🔍 Performance Benefits

### File Size Reduction

- **WebP vs JPEG**: 25-35% smaller file sizes
- **Responsive images**: Only load the size needed
- **Quality optimization**: Balanced quality vs file size

### Loading Performance

- **Lazy loading**: Images load only when needed
- **Progressive loading**: Better perceived performance
- **Preloading**: Critical images load immediately

### Mobile Performance

- **Smaller images**: Faster loading on slow connections
- **Responsive design**: Appropriate sizes for screen size
- **Optimized formats**: WebP for modern mobile browsers

## 🛠️ Advanced Usage

### Custom Image Sizes

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { IMAGE_SIZES } from '@/lib/imageOptimization';

const CustomImage = () => (
  <OptimizedImage 
    src="/images/property1.jpg"
    alt="Property"
    sizes={[IMAGE_SIZES.small, IMAGE_SIZES.large]}
    quality={85}
    format="webp"
    responsive={true}
  />
);
```

### Manual Optimization

```tsx
import { getOptimizedImageUrl, supportsWebP } from '@/lib/imageOptimization';

const imageUrl = getOptimizedImageUrl(
  '/images/property1.jpg',
  { width: 800, height: 600, suffix: 'custom' },
  'webp',
  85
);
```

## 📊 Monitoring

### Build-time Optimization

The build process shows optimization statistics:

```
✓ Optimized: property1.jpg (2.1MB → 456KB, 78% reduction)
✓ Generated: property1-small.webp (156KB)
✓ Generated: property1-medium.webp (234KB)
✓ Generated: property1-large.webp (456KB)
```

### Browser Support

The system automatically detects and serves appropriate formats:

```javascript
// Check browser support
if (supportsWebP()) {
  // Serve WebP images
} else if (supportsAVIF()) {
  // Serve AVIF images
} else {
  // Serve JPEG fallback
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Images not optimizing**: Check if images are in `public/images/` directory
2. **WebP not loading**: Verify browser support or check fallback
3. **Large file sizes**: Adjust quality settings in configuration
4. **Build errors**: Ensure all dependencies are installed

### Debug Mode

Enable debug logging in the optimization script:

```javascript
// Add to scripts/optimize-images.js
console.log('Processing image:', inputPath);
console.log('Output path:', outputPath);
```

## 📈 Best Practices

1. **Use appropriate variants**: Choose the right image variant for your use case
2. **Set priority for above-the-fold**: Use `priority={true}` for hero images
3. **Optimize uploads**: Compress images before uploading to the system
4. **Monitor performance**: Use browser dev tools to check loading times
5. **Test on mobile**: Verify performance on actual mobile devices

## 🔄 Maintenance

### Regular Optimization

Run the optimization script regularly:

```bash
# Add to your deployment pipeline
npm run optimize-images
```

### Cleanup

Remove unused optimized images:

```bash
# Clean up old optimized images
rm -rf public/images/optimized/*
npm run optimize-images
```

This image optimization system will significantly improve your real estate website's loading performance, especially on mobile devices, while maintaining high image quality and providing a great user experience. 