import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private platformId = inject(PLATFORM_ID);
  private readonly supportedFormats: Record<string, boolean> = {};
  // Flag to indicate if we should attempt to use optimized images
  private useOptimizedImages = false;
  
  constructor() {
    this.detectSupportedFormats();
    
    // Check if optimized images directory exists (for development mode)
    if (isPlatformBrowser(this.platformId)) {
      this.checkOptimizedImagesAvailability();
    }
  }
  
  /**
   * Detects which image formats are supported by the browser
   */
  private detectSupportedFormats(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check WebP support
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        this.supportedFormats['webp'] = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } else {
        this.supportedFormats['webp'] = false;
      }
      
      console.log(`Browser WebP support: ${this.supportedFormats['webp']}`);
      // You can add more format detection here (AVIF, etc.)
    }
  }

  /**
   * Check if optimized images are available
   */
  private checkOptimizedImagesAvailability(): void {
    // For simplicity, we'll explicitly disable this for now
    // This can be enabled once the image optimization process is complete
    this.useOptimizedImages = false;
    
    console.log(`Using optimized images: ${this.useOptimizedImages}`);
    
    // In production, assume optimized images exist
    if (window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      this.useOptimizedImages = true;
    }
  }

  /**
   * Gets the optimal image URL based on format support and screen size
   * @param originalPath Original image path
   * @param width Desired width of the image
   * @returns Optimized image path
   */
  getOptimizedImageUrl(originalPath: string, width: number = 0): string {
    if (!isPlatformBrowser(this.platformId)) {
      return originalPath; // On server, return original path
    }
    
    // Don't process external URLs
    if (originalPath.startsWith('http') && !originalPath.includes(window.location.hostname)) {
      return originalPath;
    }
    
    // If we're not using optimized images (dev mode), return original
    if (!this.useOptimizedImages) {
      return originalPath;
    }
    
    try {
      // Extract path parts
      const pathParts = originalPath.split('.');
      const extension = pathParts.pop()?.toLowerCase() || '';
      const basePath = pathParts.join('.').replace('assets/img', 'assets/img-optimized');
      
      // If width is not provided, use screen width for responsive sizing
      const targetWidth = width || this.getTargetWidth();
      
      // If WebP is supported and the source isn't already WebP
      if (this.supportedFormats['webp'] && extension !== 'webp') {
        // The naming convention here assumes you'll have images like: 
        // image-500w.webp, image-800w.webp, etc.
        return `${basePath}-${targetWidth}w.webp`;
      }
      
      // If WebP not supported or already WebP, just use responsive width
      return `${basePath}-${targetWidth}w.${extension}`;
    } catch (error) {
      console.error('Error generating optimized image URL:', error);
      return originalPath;
    }
  }
  
  /**
   * Gets appropriate image width based on screen size
   */
  private getTargetWidth(): number {
    const screenWidth = window.innerWidth;
    
    // Return a width based on device screen size
    if (screenWidth <= 640) return 640;
    if (screenWidth <= 768) return 768;
    if (screenWidth <= 1024) return 1024;
    if (screenWidth <= 1280) return 1280;
    return 1920; // Default for larger screens
  }
} 