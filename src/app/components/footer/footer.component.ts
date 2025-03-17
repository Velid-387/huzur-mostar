import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isVisible = false;
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Make button initially visible for testing
      this.isVisible = true;
      this.cdr.detectChanges();
      console.log('Button should be visible:', this.isVisible);
      
      this.setupScrollToTop();
    }
  }

  setupScrollToTop(): void {
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      const shouldBeVisible = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
      if (this.isVisible !== shouldBeVisible) {
        this.isVisible = shouldBeVisible;
        console.log('Scroll detected, visibility:', this.isVisible);
        this.cdr.detectChanges();
      }
    });
  }

  scrollToTop(): void {
    console.log('Scroll to top clicked');
    this.scrollService.scrollToTop();
  }
}