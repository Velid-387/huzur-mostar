import { Component, inject, OnInit, HostListener, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { ImageService } from '../../services/image.service';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private imageService = inject(ImageService);
  
  showScrollIndicator: boolean = true;
  backgroundImages = [
    'assets/img/home/huzur-home-1.jpg',
    'assets/img/home/huzur-home-9.jpg',
    'assets/img/home/huzur-home-4.jpg',
    'assets/img/home/huzur-home-5.jpg',
    'assets/img/home/huzur-home-6.jpg',
    'assets/img/home/huzur-home-7.jpg',
    'assets/img/home/huzur-home-8.jpg'
  ];
  optimizedBackgroundImages: string[] = [];
  currentImageIndex = 0;
  private slideInterval: any;
  
  constructor() { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Optimize background images
      this.optimizedBackgroundImages = this.backgroundImages.map(img => 
        this.imageService.getOptimizedImageUrl(img)
      );
      
      this.startSlideshow();
      // Initialize with scroll indicator visible
      this.showScrollIndicator = true;
    }
  }
  
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopSlideshow();
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY;
      
      // Hide scroll indicator after scrolling down a bit
      if (scrollPosition > 50 && this.showScrollIndicator) {
        this.showScrollIndicator = false;
      } else if (scrollPosition <= 10 && !this.showScrollIndicator) {
        // Show it again if user scrolls back to top
        this.showScrollIndicator = true;
      }
    }
  }
  
  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToElementById(sectionId);
    }
  }

  private startSlideshow() {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
      }, 5000);
    }
  }

  private stopSlideshow() {
    if (isPlatformBrowser(this.platformId) && this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}