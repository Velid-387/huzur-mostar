import { Injectable, inject } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private platformId = inject(PLATFORM_ID);
  private lastScrollY = 0;
  private isScrollingDown = false;
  private ticking = false;

  constructor() {
    // Only run this code in the browser, not on the server
    if (isPlatformBrowser(this.platformId)) {
      // Set up scroll boundary detection
      this.setupScrollBoundaryDetection();
      
      // Listen to router events to handle fragment navigation
      this.router.events.pipe(
        filter(event => event instanceof Scroll)
      ).subscribe((event: Scroll) => {
        if (event.position) {
          // Backward navigation
          this.viewportScroller.scrollToPosition(event.position);
        } else if (event.anchor) {
          // Anchor navigation
          setTimeout(() => {
            // Add null check here
            if (event.anchor) {
              this.scrollToElementById(event.anchor);
            }
          }, 100);
        } else {
          // Forward navigation
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    }
  }

  // Set up detection for when user reaches top or bottom of page
  setupScrollBoundaryDetection(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.addEventListener('scroll', () => {
      // Track scroll direction
      this.isScrollingDown = window.scrollY > this.lastScrollY;
      this.lastScrollY = window.scrollY;
      
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.checkScrollBoundaries();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }
  
  checkScrollBoundaries(): void {
    // Get the full scroll height
    const scrollHeight = Math.max(
      document.body.scrollHeight, 
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    // Check if at top
    if (scrollPosition <= 0 && !this.isScrollingDown) {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.classList.remove('bounce-top');
        // Force a reflow before adding the class again
        void homeSection.offsetWidth;
        homeSection.classList.add('bounce-top');
      }
    }
    
    // Check if at bottom
    if ((windowHeight + scrollPosition >= scrollHeight - 5) && this.isScrollingDown) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.classList.remove('bounce-bottom');
        // Force a reflow before adding the class again
        void contactSection.offsetWidth;
        contactSection.classList.add('bounce-bottom');
      }
    }
  }

  scrollToElementById(id: string | null): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (id === null) return;
    
    const element = document.getElementById(id);
    if (element) {
      // Remove any existing animation classes first
      if (id === 'home') {
        element.classList.remove('bounce-top');
      } else if (id === 'contact') {
        element.classList.remove('bounce-bottom');
      }
      
      // Smooth scroll to the element
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}