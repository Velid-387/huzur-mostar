import { Component, OnInit, inject, PLATFORM_ID, HostListener } from '@angular/core';
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
  isScrollButtonVisible = false;
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

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
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}