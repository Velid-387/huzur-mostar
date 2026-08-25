import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';
import { Product, FRESH_FLOWERS, DRIED_FLOWERS, POTTED_PLANTS } from '../../data/products.data';

import { BotanicalComponent } from '../shared/botanical/botanical.component';
interface ProductCategory {
  /** Also the element id the header dropdown links to. */
  key: 'freshFlowers' | 'driedFlowers' | 'magnets';
  title: string;
  text: string;
}

interface CarouselState {
  products: any[];
  originalProducts: Product[];
  activeIndex: number;
  realActiveIndex: number;
  translateX: number;
  carouselInterval: any;
  isTransitioning: boolean;
  cardWidth: number;
  containerWidth: number;
  skipTransition: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent, BotanicalComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  // Product categories (data lives in src/app/data/products.data.ts, shared with the hero marquee)
  driedFlowers: Product[] = DRIED_FLOWERS;
  freshFlowers: Product[] = FRESH_FLOWERS;
  magnets: Product[] = POTTED_PLANTS;

  categories: ProductCategory[] = [
    {
      key: 'freshFlowers',
      title: 'Huzur aranžmani sa svježim cvijećem',
      text: 'Unikatni cvjetni aranžmani svježeg cvijeća pripremljeni s ljubavlju i pažnjom da upotpune svaku priliku. U ponudi se nalaze buketi, ikebane, aranžmani u vazni, korpice, cvjetni boxevi.',
    },
    {
      key: 'driedFlowers',
      title: 'Huzur aranžmani sa suhim cvijećem',
      text: 'Bezvremenske cvjetne kompozicije u čijoj ljepoti se uživa na duge staze. U ponudi se nalaze buketići/magnetići, aranžmani u vazni.',
    },
    {
      key: 'magnets',
      title: 'Huzur lončanice',
      text: 'Raznovrsne saksijske sobne i vrtne biljke su idealan način da životni prostor istovremeno oplemene i unesu i dašak topline i dašak svježine.',
    },
  ];

  // Carousel states for each category
  carouselStates: { [key: string]: CarouselState } = {
    driedFlowers: this.initializeCarouselState(this.driedFlowers),
    freshFlowers: this.initializeCarouselState(this.freshFlowers),
    magnets: this.initializeCarouselState(this.magnets),
  };

  numberOfClones: number = 2;
  isMobile: boolean = false;
  /** Keep in sync with the ring-fill animation duration in products.component.css */
  autoScrollDelay: number = 5000;
  /** Autoplay stops for good once the visitor takes over, and never starts under reduced motion. */
  autoplayStopped: boolean = false;
  private hoverPaused: boolean = false;

  private initializeCarouselState(products: Product[]): CarouselState {
    return {
      products: [],
      originalProducts: products,
      activeIndex: 0,
      realActiveIndex: 0,
      translateX: 0,
      carouselInterval: null,
      isTransitioning: false,
      cardWidth: 0,
      containerWidth: 0,
      skipTransition: false,
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach((key) => {
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
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.autoplayStopped = true;
      }
      setTimeout(() => {
        Object.keys(this.carouselStates).forEach((key) => {
          this.calculateDimensions(key);
          this.updateTranslateX(key);
          this.startAutoScroll(key);
        });
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.carouselStates).forEach((key) => {
        this.stopAutoScroll(key);
      });
    }
  }

  createExtendedProductsArray(state: CarouselState): void {
    state.products = [];

    // Add clones from end
    for (let i = 0; i < this.numberOfClones; i++) {
      const index = state.originalProducts.length - this.numberOfClones + i;
      if (index >= 0) {
        state.products.push({
          ...state.originalProducts[index],
          isClone: true,
          originalIndex: index,
        });
      }
    }

    // Add original products
    state.originalProducts.forEach((product, index) => {
      state.products.push({ ...product, isClone: false, originalIndex: index });
    });

    // Add clones from start
    for (let i = 0; i < this.numberOfClones; i++) {
      state.products.push({
        ...state.originalProducts[i],
        isClone: true,
        originalIndex: i,
      });
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 900;
      Object.keys(this.carouselStates).forEach((key) => {
        this.calculateDimensions(key);
        this.updateTranslateX(key, true);
      });
    }
  }

  calculateDimensions(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.querySelector(
      `#${category} .carousel-container`
    ) as HTMLElement;
    if (!container) return;

    const state = this.carouselStates[category];
    state.containerWidth = container.offsetWidth;

    if (this.isMobile) {
      state.cardWidth = state.containerWidth;
    } else {
      state.cardWidth = state.containerWidth / 3;
    }
  }

  @HostListener('pointerdown')
  @HostListener('focusin')
  stopAllAutoplay(): void {
    if (this.autoplayStopped) return;
    this.autoplayStopped = true;
    Object.keys(this.carouselStates).forEach((key) => this.stopAutoScroll(key));
  }

  @HostListener('mouseenter')
  pauseAutoplay(): void {
    if (this.autoplayStopped) return;
    this.hoverPaused = true;
    Object.keys(this.carouselStates).forEach((key) => this.stopAutoScroll(key));
  }

  @HostListener('mouseleave')
  resumeAutoplay(): void {
    if (this.autoplayStopped || !this.hoverPaused) return;
    this.hoverPaused = false;
    Object.keys(this.carouselStates).forEach((key) => this.startAutoScroll(key));
  }

  startAutoScroll(category: string): void {
    if (this.autoplayStopped || this.hoverPaused) return;
    const state = this.carouselStates[category];
    this.stopAutoScroll(category);
    state.carouselInterval = setInterval(() => {
      this.nextProduct(category);
    }, this.autoScrollDelay);
  }

  stopAutoScroll(category: string): void {
    const state = this.carouselStates[category];
    if (state.carouselInterval) {
      clearInterval(state.carouselInterval);
      state.carouselInterval = null;
    }
  }

  resetAutoScroll(category: string): void {
    this.stopAutoScroll(category);
    this.startAutoScroll(category);
  }

  handleInfiniteLoop(category: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const state = this.carouselStates[category];
    if (
      state.activeIndex >=
      state.originalProducts.length + this.numberOfClones
    ) {
      const newIndex =
        this.numberOfClones +
        (state.activeIndex -
          (state.originalProducts.length + this.numberOfClones));

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
    state.realActiveIndex =
      (state.activeIndex -
        this.numberOfClones +
        state.originalProducts.length) %
      state.originalProducts.length;
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
    state.realActiveIndex =
      (state.activeIndex -
        this.numberOfClones +
        state.originalProducts.length) %
      state.originalProducts.length;
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
      state.translateX =
        -state.activeIndex * state.cardWidth +
        (state.containerWidth / 2 - state.cardWidth / 2);
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

  /** True while this category's autoplay is running, so the template can show its ring. */
  isAutoplaying(category: string): boolean {
    return !this.autoplayStopped && !!this.carouselStates[category].carouselInterval;
  }
}
