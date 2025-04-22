/**
 * This script converts images to WebP format and creates multiple sizes
 * It requires the 'sharp' package to be installed:
 * npm install sharp --save-dev
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // You'll need to install this package with npm

// Configuration
const config = {
  // Source directory with original images
  sourceDir: path.join(__dirname, '../src/assets/img'),
  // Target directory for optimized images (will mirror source structure)
  targetDir: path.join(__dirname, '../src/assets/img-optimized'),
  // Image sizes to generate
  sizes: [640, 768, 1024, 1280, 1920],
  // Quality for WebP conversion (0-100)
  quality: 80,
  // File types to process
  validExtensions: ['.jpg', '.jpeg', '.png']
};

// Ensure target directory exists
if (!fs.existsSync(config.targetDir)) {
  fs.mkdirSync(config.targetDir, { recursive: true });
}

// Process a single image
async function processImage(sourcePath, targetDir) {
  const filename = path.basename(sourcePath);
  const ext = path.extname(filename).toLowerCase();
  
  // Skip if not a valid image type
  if (!config.validExtensions.includes(ext)) {
    return;
  }
  
  // Create base filename without extension
  const basename = path.basename(filename, ext);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  try {
    // Load image
    const image = sharp(sourcePath);
    const metadata = await image.metadata();
    
    // Create WebP versions at different sizes
    for (const size of config.sizes) {
      // Skip sizes larger than original to avoid upscaling
      if (size > metadata.width) continue;
      
      // WebP version
      await image
        .resize(size)
        .webp({ quality: config.quality })
        .toFile(path.join(targetDir, `${basename}-${size}w.webp`));
      
      // Original format version (for browsers that don't support WebP)
      await image
        .resize(size)
        .toFile(path.join(targetDir, `${basename}-${size}w${ext}`));
    }
    
    console.log(`Processed: ${sourcePath}`);
  } catch (error) {
    console.error(`Error processing ${sourcePath}:`, error);
  }
}

// Process all images in a directory recursively
async function processDirectory(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    
    if (entry.isDirectory()) {
      // Process subdirectories recursively
      await processDirectory(sourcePath, targetPath);
    } else {
      // Process image file
      await processImage(sourcePath, targetPath);
    }
  }
}

// Start processing
(async () => {
  console.log('Starting image optimization...');
  await processDirectory(config.sourceDir, config.targetDir);
  console.log('Image optimization complete!');
})().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
}); 