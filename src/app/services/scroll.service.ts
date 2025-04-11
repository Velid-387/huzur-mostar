import { Injectable, inject } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  constructor() {
    // Listen to router events to handle fragment navigation
    this.router.events.pipe(
      filter(event => event instanceof Scroll)
    ).subscribe((event: Scroll) => {
      if (event.position) {
        // Backward navigation - use the stored position
        setTimeout(() => {
          if (event.position) {
            this.viewportScroller.scrollToPosition(event.position);
          }
        });
      } else if (event.anchor) {
        // Anchor navigation
        setTimeout(() => {
          if (event.anchor) {
            this.scrollToElementById(event.anchor);
          }
        });
      }
      // For forward navigation, let the router handle it
    });
  }

  scrollToElementById(id: string | null): void {
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}