import { Component, OnInit, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isScrollButtonVisible = false;
  scrollProgress = 0;
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScrollPosition();
    }
  }

  @HostListener('window:scroll', [])
  checkScrollPosition(): void {
    if (isPlatformBrowser(this.platformId)) {
      const homeSection = document.getElementById('home');
      const homeSectionHeight = homeSection ? homeSection.offsetHeight : 500;

      this.isScrollButtonVisible = window.scrollY > homeSectionHeight;

      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = Math.min(scrollTop / docHeight, 1);
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
  
  navigateWithScrollToTop(path: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Prevent default behavior
      event?.preventDefault();
      
      // Manually navigate and scroll
      this.router.navigateByUrl(path).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}