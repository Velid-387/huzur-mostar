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

  constructor() {
    // Only run this code in the browser, not on the server
    if (isPlatformBrowser(this.platformId)) {
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

  scrollToElementById(id: string | null): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (id === null) return;
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}