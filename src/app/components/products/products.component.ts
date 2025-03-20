import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  originalProducts = [
    {
      imgSrc: 'assets/img/products/huzur-buket-14.png',
      imgAlt: 'Spring Bouquet',
      title: 'Spring Delight',
      description: 'A vibrant mix of seasonal spring flowers including tulips, daffodils, and hyacinths.',
      price: '45.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-12.png',
      imgAlt: 'Rose Arrangement',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium red roses, perfect for expressing love and appreciation.',
      price: '59.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-kucno-cvijece-2.png',
      imgAlt: 'Succulent Garden',
      title: 'Succulent Garden',
      description: 'Low-maintenance succulent arrangement in a stylish container, perfect for home or office.',
      price: '39.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-box-2.png',
      imgAlt: 'Box',
      title: 'Box',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '65.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-13.png',
      imgAlt: 'Bouquet',
      title: 'Bouquet',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '29.99 KM'
    },
    {
      imgSrc: 'assets/img/products/huzur-kucno-cvijece-3.png',
      imgAlt: 'For Home',
      title: 'For Home',
      description: 'Exotic arrangement featuring bird of paradise, orchids, and tropical foliage.',
      price: '10.99 KM'
    }
  ];

  // The products array with clones for infinite scrolling
  products: any[] = [];
  
  // Number of clones to add at beginning and end
  numberOfClones: number = 2;
  
  // Carousel properties
  // This will be updated after clones are added
  activeIndex: number = 0;
  realActiveIndex: number = 0; // Index in original products array
  translateX: number = 0;
  carouselInterval: any;
  timerAnimation: any;
  timerProgress: number = 88; // Initial value for stroke-dashoffset
  isMobile: boolean = false;
  autoScrollDelay: number = 5000; // 5 seconds
  isTransitioning: boolean = false;
  animationTimestep: number = 50; // Update timer every 50ms
  cardWidth: number = 0;
  containerWidth: number = 0;
  skipTransition: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Create the extended products array with clones
      this.createExtendedProductsArray();
      
      // Set initial active index to after the clones
      this.activeIndex = this.numberOfClones;
      this.realActiveIndex = 0;
      
      this.checkScreenSize();
    }
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Set initial position after DOM is ready
      setTimeout(() => {
        this.calculateDimensions();
        this.updateTranslateX();
        this.startAutoScroll();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoScroll();
      this.stopTimerAnimation();
    }
  }
  
  // Create an extended array with clones at beginning and end
  createExtendedProductsArray(): void {
    // Clear existing array
    this.products = [];
    
    // Add clones at beginning (last items of original array)
    for (let i = 0; i < this.numberOfClones; i++) {
      const index = this.originalProducts.length - this.numberOfClones + i;
      if (index >= 0) {
        this.products.push({...this.originalProducts[index], isClone: true, originalIndex: index});
      }
    }
    
    // Add all original products
    this.originalProducts.forEach((product, index) => {
      this.products.push({...product, isClone: false, originalIndex: index});
    });
    
    // Add clones at end (first items of original array)
    for (let i = 0; i < this.numberOfClones; i++) {
      this.products.push({...this.originalProducts[i], isClone: true, originalIndex: i});
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.calculateDimensions();
      this.updateTranslateX(true); // skip animation
    }
  }
  
  calculateDimensions(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (!container) return;
    
    this.containerWidth = container.offsetWidth;
    
    if (this.isMobile) {
      this.cardWidth = this.containerWidth;
    } else {
      this.cardWidth = this.containerWidth / 3;
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
  
  // Method to handle infinite loop transition
  handleInfiniteLoop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Check if we need to jump to the beginning (we're at the end clones)
    if (this.activeIndex >= this.originalProducts.length + this.numberOfClones) {
      // Set the new active index to be just after the beginning clones
      const newIndex = this.numberOfClones + (this.activeIndex - (this.originalProducts.length + this.numberOfClones));
      
      // Turn off transitions
      this.skipTransition = true;
      
      // Update activeIndex and jump
      this.activeIndex = newIndex;
      this.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(true);
      
      // Re-enable transitions after a small delay
      setTimeout(() => {
        this.skipTransition = false;
      }, 50);
    }
    
    // Check if we need to jump to the end (we're at the beginning clones)
    else if (this.activeIndex < this.numberOfClones) {
      // Set the new active index to be before the end clones
      const newIndex = this.originalProducts.length + this.activeIndex;
      
      // Turn off transitions
      this.skipTransition = true;
      
      // Update activeIndex and jump
      this.activeIndex = newIndex;
      this.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(true);
      
      // Re-enable transitions after a small delay
      setTimeout(() => {
        this.skipTransition = false;
      }, 50);
    }
  }

  nextProduct(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.activeIndex++;
    this.realActiveIndex = (this.activeIndex - this.numberOfClones + this.originalProducts.length) % this.originalProducts.length;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.handleInfiniteLoop();
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  prevProduct(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.activeIndex--;
    this.realActiveIndex = (this.activeIndex - this.numberOfClones + this.originalProducts.length) % this.originalProducts.length;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.handleInfiniteLoop();
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  goToProduct(index: number): void {
    if (this.isTransitioning || index === this.realActiveIndex) return;
    
    this.isTransitioning = true;
    this.activeIndex = index + this.numberOfClones;
    this.realActiveIndex = index;
    this.updateTranslateX();
    this.resetAutoScroll();
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500); // Match this to your CSS transition duration
  }

  updateTranslateX(skipAnimation: boolean = false): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.isMobile) {
      // On mobile, just center the active card
      this.translateX = -this.activeIndex * this.cardWidth;
    } else {
      // On desktop, adjust for showing 3 cards with active in center
      this.translateX = -this.activeIndex * this.cardWidth + (this.containerWidth / 2 - this.cardWidth / 2);
    }
  }

  // Determine if a card should be displayed with the "left" class
  isLeftProduct(index: number): boolean {
    if (this.isMobile) return false;
    
    // The previous card is always left
    return index === this.activeIndex - 1;
  }

  // Determine if a card should be displayed with the "right" class
  isRightProduct(index: number): boolean {
    if (this.isMobile) return false;
    
    // The next card is always right
    return index === this.activeIndex + 1;
  }
  
  // Check if a card is active based on display index
  isActive(index: number): boolean {
    return index === this.activeIndex;
  }
  
  // Get class for carousel wrapper based on transition state
  getCarouselWrapperClass(): string {
    return this.skipTransition ? 'no-transition' : '';
  }
  
  // Get class for auto-scroll indicator
  showTimer(index: number): boolean {
    if (this.isMobile) {
      return index === this.activeIndex;
    } else {
      // Only show timer on the active (center) card
      return index === this.activeIndex;
    }
  }
}