/**
 * This script moves optimized images from their subdirectories
 * to the main image directory for better accessibility
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Target directory for optimized images
  imgOptimizedDir: path.join(__dirname, '../src/assets/img-optimized'),
  // The specific home images we want to fix
  targetImages: ['huzur-home-8.jpg', 'huzur-home-9.jpg']
};

// Process each target image
async function processImages() {
  console.log('Starting image structure fix...');
  
  for (const imgName of config.targetImages) {
    const sourceDir = path.join(config.imgOptimizedDir, 'home', imgName);
    const targetDir = path.join(config.imgOptimizedDir, 'home');
    
    console.log(`Processing ${imgName}...`);
    
    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.error(`Source directory ${sourceDir} does not exist!`);
      continue;
    }
    
    // Get all files in the source directory
    const files = fs.readdirSync(sourceDir);
    
    // Copy each file to the target directory
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      // Copy the file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${file} to ${targetDir}`);
    }
  }
  
  console.log('Image structure fix complete!');
}

// Start processing
(async () => {
  await processImages();
})().catch(err => {
  console.error('Error during image structure fix:', err);
  process.exit(1);
}); 