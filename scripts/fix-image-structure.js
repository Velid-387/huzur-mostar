/**
 * This script reorganizes the optimized images directory structure
 * to fix the nested folder issue
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Root directory for optimized images
  optimizedDir: path.join(__dirname, '../src/assets/img-optimized'),
};

// Process all directories recursively
function processDirectory(dirPath) {
  console.log(`Processing directory: ${dirPath}`);
  
  // Read directory contents
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Check if directory name has an image extension
      if (entry.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        console.log(`Found image folder: ${entryPath}`);
        // This is a directory that should be flattened
        moveFilesToParent(entryPath, dirPath);
      } else {
        // Process subdirectories recursively
        processDirectory(entryPath);
      }
    }
  }
}

// Move files from a nested directory to its parent
function moveFilesToParent(sourceDir, targetDir) {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.log(`Directory doesn't exist: ${sourceDir}`);
      return;
    }
    
    const files = fs.readdirSync(sourceDir);
    let movedFiles = 0;
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        // Log the move operation
        console.log(`Moving ${sourcePath} to ${targetPath}`);
        
        // Check if target file already exists
        if (fs.existsSync(targetPath)) {
          console.log(`Target file already exists: ${targetPath}. Skipping.`);
          continue;
        }
        
        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);
        
        // Verify the copy
        if (fs.existsSync(targetPath)) {
          console.log(`Successfully moved ${file}`);
          movedFiles++;
        } else {
          console.error(`Failed to move ${file}`);
        }
      }
    }
    
    // Delete the source directory if we moved files
    if (movedFiles > 0) {
      try {
        // Use recursive option for Node.js 12+
        fs.rmSync(sourceDir, { recursive: true, force: true });
        console.log(`Removed source directory: ${sourceDir}`);
      } catch (error) {
        console.error(`Error removing directory ${sourceDir}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error moving files from ${sourceDir}:`, error);
  }
}

// Start processing
console.log('Starting image directory structure fix...');
processDirectory(config.optimizedDir);
console.log('Directory structure fix complete!'); 