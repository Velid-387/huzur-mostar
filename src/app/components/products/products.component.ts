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
      imgSrc: 'assets/img/products/huzur-buket-2.png',
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

  // Carousel properties
  activeIndex: number = 0;
  translateX: number = 0;
  carouselInterval: any;
  isMobile: boolean = false;
  autoScrollDelay: number = 5000; // 5 seconds

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.startAutoScroll();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoScroll();
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
    this.carouselInterval = setInterval(() => {
      this.nextProduct();
    }, this.autoScrollDelay);
  }

  stopAutoScroll(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  resetAutoScroll(): void {
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  nextProduct(): void {
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
    this.updateTranslateX();
    this.resetAutoScroll();
  }

  prevProduct(): void {
    this.activeIndex = (this.activeIndex - 1 + this.products.length) % this.products.length;
    this.updateTranslateX();
    this.resetAutoScroll();
  }

  goToProduct(index: number): void {
    this.activeIndex = index;
    this.updateTranslateX();
    this.resetAutoScroll();
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
    
    // Check if this product should be positioned to the left of the active one
    if (this.products.length <= 3) {
      return index === (this.activeIndex - 1 + this.products.length) % this.products.length;
    }
    
    // For handling the edge cases with circular navigation
    return (
      index === (this.activeIndex - 1 + this.products.length) % this.products.length ||
      index === (this.activeIndex - 2 + this.products.length) % this.products.length
    );
  }

  isRightProduct(index: number): boolean {
    if (this.isMobile) return false;
    
    // Check if this product should be positioned to the right of the active one
    if (this.products.length <= 3) {
      return index === (this.activeIndex + 1) % this.products.length;
    }
    
    // For handling the edge cases with circular navigation
    return (
      index === (this.activeIndex + 1) % this.products.length ||
      index === (this.activeIndex + 2) % this.products.length
    );
  }
}