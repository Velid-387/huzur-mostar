import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
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
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollToTop();
    }
  }

  setupScrollToTop(): void {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
      // Initially hide the button
      scrollToTopBtn.style.display = 'none';
      
      // Add click event
      scrollToTopBtn.addEventListener('click', () => {
        this.scrollService.scrollToTop();
      });
      
      // Show/hide based on scroll position
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          scrollToTopBtn.style.display = 'block';
        } else {
          scrollToTopBtn.style.display = 'none';
        }
      });
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}