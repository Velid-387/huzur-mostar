import { Component, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LazyLoadDirective } from '../../../directives/lazy-load.directive';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  template: `
    <div class="image-container {{class}}" [class.loading]="loading">
      <img
        *ngIf="!isBackground && currentSrc; else backgroundTemplate"
        class="optimized-image"
        [width]="width"
        [height]="height"
        [attr.alt]="alt"
        [appLazyLoad]="currentSrc"
        (imageLoaded)="onImageLoaded()"
        (imageError)="onImageError()"
        loading="lazy"
      >
      <ng-template #backgroundTemplate>
        <div
          *ngIf="currentSrc"
          class="background-image"
          [appLazyLoad]="currentSrc"
          (imageLoaded)="onImageLoaded()"
          (imageError)="onImageError()"
        >
          <ng-content></ng-content>
        </div>
      </ng-template>
      <div class="placeholder" *ngIf="loading">
        <div class="placeholder-shimmer"></div>
      </div>
    </div>
  `,
  styles: [`
    .image-container {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    
    .optimized-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      z-index: 1;
      transform: none !important; /* Prevent any transforms */
      max-height: 100%;
    }
    
    .image-container:not(.loading) .optimized-image {
      opacity: 1;
    }
    
    .background-image {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      z-index: 0;
    }
    
    .placeholder-shimmer {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0)
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `]
})
export class OptimizedImageComponent implements OnInit {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() class: string = '';
  @Input() isBackground: boolean = false;

  optimizedSrc: string = '';
  currentSrc: string | null = null; // The current src being used
  loading: boolean = true;
  fallbackAttempted: boolean = false;
  alternatePathAttempted: boolean = false;
  
  private imageService = inject(ImageService);
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initially use original src while we calculate the optimized one
      this.currentSrc = this.src;
      
      // Get optimized image path
      this.optimizedSrc = this.imageService.getOptimizedImageUrl(this.src, this.width);
      
      // Use the optimized path if available
      this.currentSrc = this.optimizedSrc;
    } else {
      // On server, use original path to avoid 404s during SSR
      this.currentSrc = this.src;
    }
  }
  
  onImageLoaded(): void {
    this.loading = false;
  }
  
  onImageError(): void {
    // Try alternative path format first
    if (!this.alternatePathAttempted && this.currentSrc && this.currentSrc !== this.src) {
      this.alternatePathAttempted = true;

      // If the current path has a structure with subdirectory like:
      // assets/img-optimized/products/bouquets/buket-1.jpg/buket-1-768w.webp
      // Try the alternative format without subdirectory:
      // assets/img-optimized/products/bouquets/buket-1-768w.webp

      const pathParts = this.currentSrc.split('.');
      const extension = pathParts.pop() || '';
      const basePath = pathParts.join('.');
      
      if (basePath.includes('/')) {
        // Check if we're using the subdirectory format
        const parts = basePath.split('/');
        const filenameWithSize = parts.pop() || '';
        const dirPath = parts.join('/');
        
        if (dirPath.endsWith(filenameWithSize.split('-')[0])) {
          // We're using the subdirectory format, try the alternate format
          const pathWithoutSubdir = dirPath + '/' + filenameWithSize + '.' + extension;
          this.currentSrc = pathWithoutSubdir;
          return;
        }
      }
      
      // If this is already the second format, or we couldn't parse the path,
      // try converting to the alternate format
      try {
        // Try to convert to flat format
        let alternatePath = this.optimizedSrc;
        const match = alternatePath.match(/(.*)\/(.*)-(\d+)w\.(.*)/);

        if (match) {
          const [, prefix, filename, size, ext] = match;
          alternatePath = `${prefix}/${filename}-${size}w.${ext}`;
          this.currentSrc = alternatePath;
          return;
        }
      } catch (e) {
        console.error('Error creating alternate path:', e);
      }
    }

    // If optimized image fails to load or we already tried alternates, try the original
    if (!this.fallbackAttempted && this.currentSrc && this.currentSrc !== this.src) {
      this.fallbackAttempted = true;
      this.currentSrc = this.src;
    } else if (this.fallbackAttempted) {
      // Even the original failed to load
      this.loading = false; // Stop showing loading state for missing images
    }
  }
} 