import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Product {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

interface CarouselState {
  products: any[];
  originalProducts: Product[];
  activeIndex: number;
  realActiveIndex: number;
  translateX: number;
  carouselInterval: any;
  timerAnimation: any;
  timerProgress: number;
  isTransitioning: boolean;
  cardWidth: number;
  containerWidth: number;
  skipTransition: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  // Product categories
  driedFlowers: Product[] = [
    {
      imgSrc: 'assets/img/products/huzur-buket-9.png',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Eternal Spring',
      description: 'A timeless arrangement of preserved flowers that maintain their beauty forever.'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-10.png',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Eternal Spring',
      description: 'A timeless arrangement of preserved flowers that maintain their beauty forever.'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-11.png',
      imgAlt: 'Dried Flower Bouquet',
      title: 'Eternal Spring',
      description: 'A timeless arrangement of preserved flowers that maintain their beauty forever.'
    }
  ];

  freshFlowers: Product[] = [
    {
      imgSrc: 'assets/img/products/huzur-buket-12.png',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium fresh roses, perfect for expressing love.'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-13.png',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium fresh roses, perfect for expressing love.'
    },
    {
      imgSrc: 'assets/img/products/huzur-buket-14.png',
      imgAlt: 'Fresh Flower Bouquet',
      title: 'Classic Romance',
      description: 'Elegant arrangement of premium fresh roses, perfect for expressing love.'
    }
  ];

  magnets: Product[] = [
    {
      imgSrc: 'assets/img/products/huzur-magnet-1.png',
      imgAlt: 'Decorative Magnet',
      title: 'Floral Magnet',
      description: 'Beautiful decorative magnets featuring preserved flowers.'
    },
    {
      imgSrc: 'assets/img/products/huzur-magnet-1.png',
      imgAlt: 'Decorative Magnet',
      title: 'Floral Magnet',
      description: 'Beautiful decorative magnets featuring preserved flowers.'
    },
    {
      imgSrc: 'assets/img/products/huzur-magnet-1.png',
      imgAlt: 'Decorative Magnet',
      title: 'Floral Magnet',
      description: 'Beautiful decorative magnets featuring preserved flowers.'
    }
  ];

  // Carousel states for each category
  carouselStates: { [key: string]: CarouselState } = {
    driedFlowers: this.initializeCarouselState(this.driedFlowers),
    freshFlowers: this.initializeCarouselState(this.freshFlowers),
    magnets: this.initializeCarouselState(this.magnets)
  };

  numberOfClones: number = 2;
  isMobile: boolean = false;
  autoScrollDelay: number = 5000;
  animationTimestep: number = 50;

  private initializeCarouselState(products: Product[]): CarouselState {
    return {
      products: [],
      originalProducts: products,
      activeIndex: 0,
      realActiveIndex: 0,
      translateX: 0,
      carouselInterval: null,
      timerAnimation: null,
      timerProgress: 88,
      isTransitioning: false,
      cardWidth: 0,
      containerWidth: 0,
      skipTransition: false
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach(key => {
        const state = this.carouselStates[key];
        this.createExtendedProductsArray(state);
        state.activeIndex = this.numberOfClones;
        state.realActiveIndex = 0;
      });
      
      this.checkScreenSize();
    }
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        Object.keys(this.carouselStates).forEach(key => {
          this.calculateDimensions(key);
          this.updateTranslateX(key);
          this.startAutoScroll(key);
        });
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach(key => {
        this.stopAutoScroll(key);
        this.stopTimerAnimation(key);
      });
    }
  }
  
  createExtendedProductsArray(state: CarouselState): void {
    state.products = [];

    // Add clones from end
    for (let i = 0; i < this.numberOfClones; i++) {
      const index = state.originalProducts.length - this.numberOfClones + i;
      if (index >= 0) {
        state.products.push({...state.originalProducts[index], isClone: true, originalIndex: index});
      }
    }
    
    // Add original products
    state.originalProducts.forEach((product, index) => {
      state.products.push({...product, isClone: false, originalIndex: index});
    });

    // Add clones from start
    for (let i = 0; i < this.numberOfClones; i++) {
      state.products.push({...state.originalProducts[i], isClone: true, originalIndex: i});
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      Object.keys(this.carouselStates).forEach(key => {
        this.calculateDimensions(key);
        this.updateTranslateX(key, true);
      });
    }
  }
  
  calculateDimensions(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const container = document.querySelector(`#${category} .carousel-container`) as HTMLElement;
    if (!container) return;
    
    const state = this.carouselStates[category];
    state.containerWidth = container.offsetWidth;
    
    if (this.isMobile) {
      state.cardWidth = state.containerWidth;
    } else {
      state.cardWidth = state.containerWidth / 3;
    }
  }

  startAutoScroll(category: string): void {
    const state = this.carouselStates[category];
    this.stopAutoScroll(category);
    this.startTimerAnimation(category);
    state.carouselInterval = setInterval(() => {
      this.nextProduct(category);
    }, this.autoScrollDelay);
  }

  stopAutoScroll(category: string): void {
    const state = this.carouselStates[category];
    if (state.carouselInterval) {
      clearInterval(state.carouselInterval);
    }
    this.stopTimerAnimation(category);
  }

  resetAutoScroll(category: string): void {
    this.stopAutoScroll(category);
    this.resetTimerProgress(category);
    this.startAutoScroll(category);
  }

  startTimerAnimation(category: string): void {
    const state = this.carouselStates[category];
    this.stopTimerAnimation(category);
    this.resetTimerProgress(category);
    
    let elapsed = 0;
    state.timerAnimation = setInterval(() => {
      elapsed += this.animationTimestep;
      const progress = elapsed / this.autoScrollDelay;
      state.timerProgress = 88 * (1 - progress);
      
      if (elapsed >= this.autoScrollDelay) {
        this.resetTimerProgress(category);
      }
    }, this.animationTimestep);
  }

  stopTimerAnimation(category: string): void {
    const state = this.carouselStates[category];
    if (state.timerAnimation) {
      clearInterval(state.timerAnimation);
    }
  }

  resetTimerProgress(category: string): void {
    this.carouselStates[category].timerProgress = 88;
  }
  
  handleInfiniteLoop(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
  
    const state = this.carouselStates[category];
    if (state.activeIndex >= state.originalProducts.length + this.numberOfClones) {
      const newIndex = this.numberOfClones + (state.activeIndex - (state.originalProducts.length + this.numberOfClones));

      state.skipTransition = true;
      state.activeIndex = newIndex;
      state.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(category, true);

      setTimeout(() => {
        state.skipTransition = false;
      }, 50);
    } else if (state.activeIndex < this.numberOfClones) {
      const newIndex = state.originalProducts.length + state.activeIndex;

      state.skipTransition = true;
      state.activeIndex = newIndex;
      state.realActiveIndex = newIndex - this.numberOfClones;
      this.updateTranslateX(category, true);

      setTimeout(() => {
        state.skipTransition = false;
      }, 50);
    }
  }

  nextProduct(category: string): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning) return;
    
    state.isTransitioning = true;
    state.activeIndex++;
    state.realActiveIndex = (state.activeIndex - this.numberOfClones + state.originalProducts.length) % state.originalProducts.length;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      this.handleInfiniteLoop(category);
      state.isTransitioning = false;
    }, 500);
  }

  prevProduct(category: string): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning) return;
    
    state.isTransitioning = true;
    state.activeIndex--;
    state.realActiveIndex = (state.activeIndex - this.numberOfClones + state.originalProducts.length) % state.originalProducts.length;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      this.handleInfiniteLoop(category);
      state.isTransitioning = false;
    }, 500);
  }

  goToProduct(category: string, index: number): void {
    const state = this.carouselStates[category];
    if (state.isTransitioning || index === state.realActiveIndex) return;
    
    state.isTransitioning = true;
    state.activeIndex = index + this.numberOfClones;
    state.realActiveIndex = index;
    this.updateTranslateX(category);
    this.resetAutoScroll(category);

    setTimeout(() => {
      state.isTransitioning = false;
    }, 500);
  }

  updateTranslateX(category: string, skipAnimation: boolean = false): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const state = this.carouselStates[category];
    if (this.isMobile) {
      state.translateX = -state.activeIndex * state.cardWidth;
    } else {
      state.translateX = -state.activeIndex * state.cardWidth + (state.containerWidth / 2 - state.cardWidth / 2);
    }
  }

  isLeftProduct(category: string, index: number): boolean {
    if (this.isMobile) return false;
    const state = this.carouselStates[category];
    return index === state.activeIndex - 1;
  }

  isRightProduct(category: string, index: number): boolean {
    if (this.isMobile) return false;
    const state = this.carouselStates[category];
    return index === state.activeIndex + 1;
  }
  
  isActive(category: string, index: number): boolean {
    return index === this.carouselStates[category].activeIndex;
  }
  
  getCarouselWrapperClass(category: string): string {
    return this.carouselStates[category].skipTransition ? 'no-transition' : '';
  }
  
  showTimer(category: string, index: number): boolean {
    const state = this.carouselStates[category];
    return index === state.activeIndex;
  }
}