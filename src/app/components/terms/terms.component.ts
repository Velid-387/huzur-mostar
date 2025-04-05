import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  private titleService = inject(Title);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.titleService.setTitle('Uslovi korištenja - Huzur Mostar');
    
    // Initialize animations after view is loaded, but only in browser
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top of page
      this.viewportScroller.scrollToPosition([0, 0]);
      
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
} 