import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  products = [
    {
      imgSrc: 'assets/img/products/huzur-buket-5.png',
      imgAlt: 'Spring Bouquet',
      title: 'Spring Delight',
      description: 'A vibrant mix of seasonal spring flowers including tulips, daffodils, and hyacinths.',
      price: '45.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-10.jpg',
      imgAlt: 'Rose Arrangement',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium red roses, perfect for expressing love and appreciation.',
      price: '59.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-cvijece-1.png',
      imgAlt: 'Succulent Garden',
      title: 'Succulent Garden',
      description: 'Low-maintenance succulent arrangement in a stylish container, perfect for home or office.',
      price: '39.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-box-1.png',
      imgAlt: 'Box',
      title: 'Box',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '65.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-3.png',
      imgAlt: 'Bouquet',
      title: 'Bouquet',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '29.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-kucno-cvijece-1.png',
      imgAlt: 'For Home',
      title: 'For Home',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '10.99 KM'
    }
  ];

  // Create extended products array for seamless infinite scrolling
  get extendedProducts(): any[] {
    // We don't actually extend the array in the component, we just handle it in the display logic
    return this.products;
  }

  // Carousel properties
  activeIndex: number = 1; // Start with second item (index 1) to show 3 items properly from the start
  translateX: number = 0;
  carouselInterval: any;
  timerAnimation: any;
  timerProgress: number = 88; // Initial value for stroke-dashoffset (full circle = 88)
  isMobile: boolean = false;
  autoScrollDelay: number = 5000; // 5 seconds
  isTransitioning: boolean = false;
  animationTimestep: number = 50; // Update timer every 50ms

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      // Set initial position after a short delay to ensure DOM is ready
      setTimeout(() => {
        this.updateTranslateX();
      }, 100);
      this.startAutoScroll();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoScroll();
      this.stopTimerAnimation();
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.updateTranslateX();
    }
  }

  startAutoScroll(): void {
    this.stopAutoScroll(); // Clear any existing interval
    this.startTimerAnimation();
    this.carouselInterval = setInterval(() => {
      this.nextProduct();
    }, this.autoScrollDelay);
  }

  stopAutoScroll(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.stopTimerAnimation();
  }

  resetAutoScroll(): void {
    this.stopAutoScroll();
    this.resetTimerProgress();
    this.startAutoScroll();
  }

  startTimerAnimation(): void {
    this.stopTimerAnimation();
    this.resetTimerProgress();
    
    let elapsed = 0;
    this.timerAnimation = setInterval(() => {
      elapsed += this.animationTimestep;
      const progress = elapsed / this.autoScrollDelay;
      // Calculate stroke-dashoffset (88 = full circle, 0 = complete)
      this.timerProgress = 88 * (1 - progress);
      
      if (elapsed >= this.autoScrollDelay) {
        this.resetTimerProgress();
      }
    }, this.animationTimestep);
  }

  stopTimerAnimation(): void {
    if (this.timerAnimation) {
      clearInterval(this.timerAnimation);
    }
  }

  resetTimerProgress(): void {
    this.timerProgress = 88; // Reset to full circle
  }

  nextProduct(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  prevProduct(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.activeIndex = (this.activeIndex - 1 + this.products.length) % this.products.length;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  goToProduct(index: number): void {
    if (this.isTransitioning || index === this.activeIndex) return;
    
    this.isTransitioning = true;
    this.activeIndex = index;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  updateTranslateX(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Get the container width
      const container = document.querySelector('.carousel-container') as HTMLElement;
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      
      if (this.isMobile) {
        // On mobile, just center the active card
        this.translateX = -this.activeIndex * containerWidth;
      } else {
        // On desktop, adjust for showing 3 cards with active in center
        const cardWidth = containerWidth / 3;
        this.translateX = -this.activeIndex * cardWidth + (containerWidth / 2 - cardWidth / 2);
      }
    }
  }

  isLeftProduct(index: number): boolean {
    if (this.isMobile) return false;
    
    if (this.products.length <= 3) {
      return index === (this.activeIndex - 1 + this.products.length) % this.products.length;
    }
    
    // For handling the edge cases with circular navigation - improved logic
    const normalizedIndex = (index - this.activeIndex + this.products.length) % this.products.length;
    return normalizedIndex === this.products.length - 1 || normalizedIndex === this.products.length - 2;
  }

  isRightProduct(index: number): boolean {
    if (this.isMobile) return false;
    
    if (this.products.length <= 3) {
      return index === (this.activeIndex + 1) % this.products.length;
    }
    
    // For handling the edge cases with circular navigation - improved logic
    const normalizedIndex = (index - this.activeIndex + this.products.length) % this.products.length;
    return normalizedIndex === 1 || normalizedIndex === 2;
  }
}