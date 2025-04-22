# Image Optimization Guide

This guide explains how to implement the image optimization strategy we've set up to speed up page loading.

## What We've Set Up

1. **Lazy Loading Directive**: Images will only load when they're about to enter the viewport.
2. **Image Service**: Detects browser capabilities and serves optimized images based on screen size.
3. **Optimized Image Component**: A wrapper component that handles lazy loading and optimal image format selection.
4. **Image Optimization Script**: A Node.js script to convert images to WebP and resize them.

## Steps to Complete Implementation

### 1. Install Required Dependencies

```bash
npm install sharp --save-dev
```

### 2. Run the Image Optimization Script

```bash
npm run optimize-images
```

This will:
- Create WebP versions of all your images
- Create multiple sizes of each image
- Save them in the `src/assets/img-optimized` directory

### 3. Update Image References in All Components

You need to update all components that use images. Examples:

- Replace `<img src="...">` with `<app-optimized-image [src]="..." [alt]="..." [width]="..." class="..."></app-optimized-image>`
- For background images, use `<app-optimized-image [src]="..." [isBackground]="true" class="..."></app-optimized-image>`

### 4. Update Angular Configuration

Make sure to update your assets configuration to include the new optimized images. In `angular.json`:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "assets"
  },
  // Other assets...
]
```

## Performance Testing

Once implemented, you can test the performance improvement:

1. Use Chrome DevTools "Network" tab to compare before and after load times
2. Run Lighthouse audits to measure performance improvements
3. Test on both mobile and desktop devices with different connection speeds

## Additional Tips

1. **Progressive Enhancement**: The system will fall back to original images if WebP is not supported.
2. **Caching**: Consider adding caching headers for these static assets on your server.
3. **CDN**: For further optimization, consider using a CDN to deliver your images.
4. **Further Optimization**: You can adjust the quality parameter in the optimization script if needed.

## Troubleshooting

- If images don't appear, check browser console for errors
- Ensure path references are correct
- Verify that image directory permissions allow the script to write files

### Fixing Directory Structure Issues

If you encounter errors like `Optimized image failed to load: assets/img-optimized/products/bouquets/buket-1-768w.webp, falling back to original`, it may be due to the directory structure created by the optimization script. Run the fix script:

```bash
npm run fix-image-optimization
```

This will:
1. Reorganize the optimized image directory structure
2. Ensure the ImageService is set to use optimized images
3. Rebuild the application

For manual fixes, you can also run the individual commands:

```bash
# Fix just the directory structure
npm run fix-image-structure

# Build the application
npm run build
``` 