import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  isVisible = false; // Start hidden
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  ngOnInit(): void {
    // Only run this code in the browser, not on the server
    if (isPlatformBrowser(this.platformId)) {
      console.log('ScrollToTopComponent initialized');
      
      // Set up the scroll detection
      this.document.defaultView?.addEventListener('scroll', () => {
        this.checkScrollPosition();
      });
      
      // Initial check in case page is loaded already scrolled
      this.checkScrollPosition();
      
      // Force check every second to ensure it's working
      setInterval(() => this.checkScrollPosition(), 1000);
    }
  }

  checkScrollPosition(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Show button only when scrolled down at least 200px (reduced threshold)
      const scrollPosition = this.document.defaultView?.scrollY || 0;
      const shouldBeVisible = scrollPosition > 200;
      
      // Log when visibility changes
      if (this.isVisible !== shouldBeVisible) {
        console.log('Button visibility changing to:', shouldBeVisible, 'at scroll position:', scrollPosition);
        this.isVisible = shouldBeVisible;
      }
    }
  }

  scrollToTop(): void {
    console.log('Scroll to top clicked');
    this.scrollService.scrollToTop();
  }
}
