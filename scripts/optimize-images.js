import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
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

// Ensure output directory exists
async function ensureOutputDir() {
  try {
    await fs.access(config.outputDir);
  } catch {
    await fs.mkdir(config.outputDir, { recursive: true });
  }
}

// Get all image files recursively
async function getImageFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const imageFiles = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      imageFiles.push(...await getImageFiles(fullPath));
    } else if (file.isFile() && /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file.name)) {
      imageFiles.push(fullPath);
    }
  }

  return imageFiles;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(config.inputDir, inputPath);
  const outputSubDir = path.dirname(relativePath);
  
  console.log(`Processing: ${relativePath}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Create output directory for this image
    const imageOutputDir = path.join(config.outputDir, outputSubDir);
    await fs.mkdir(imageOutputDir, { recursive: true });

    // Generate different sizes and formats
    for (const [sizeName, size] of Object.entries(config.sizes)) {
      for (const format of config.formats) {
        const outputFilename = `${filename}-${sizeName}.${format}`;
        const outputPath = path.join(imageOutputDir, outputFilename);

        // Resize and convert
        await image
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center',
          })
          .toFormat(format, { quality: config.quality })
          .toFile(outputPath);

        console.log(`  ✓ Generated: ${outputFilename}`);
      }
    }

    // Also create original size in WebP
    const originalWebpPath = path.join(imageOutputDir, `${filename}.webp`);
    await image
      .toFormat('webp', { quality: config.quality })
      .toFile(originalWebpPath);

    console.log(`  ✓ Generated: ${filename}.webp`);

  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`Input directory: ${config.inputDir}`);
  console.log(`Output directory: ${config.outputDir}`);

  try {
    // Check if input directory exists
    await fs.access(config.inputDir);
  } catch {
    console.log('Creating input directory...');
    await fs.mkdir(config.inputDir, { recursive: true });
  }

  await ensureOutputDir();

  const imageFiles = await getImageFiles(config.inputDir);
  
  if (imageFiles.length === 0) {
    console.log('No image files found. Please add images to the public/images directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to process:`);

  // Process images in parallel (with concurrency limit)
  const concurrency = 4;
  for (let i = 0; i < imageFiles.length; i += concurrency) {
    const batch = imageFiles.slice(i, i + concurrency);
    await Promise.all(batch.map(optimizeImage));
  }

  console.log('\n✅ Image optimization completed!');
  console.log(`Optimized images saved to: ${config.outputDir}`);
}

// Run the script
main().catch(console.error); 