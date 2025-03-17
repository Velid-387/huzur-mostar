import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  isVisible = false;
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.checkScrollPosition.bind(this));
    }
  }

  checkScrollPosition(): void {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
