import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  private titleService = inject(Title);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.titleService.setTitle('Politika privatnosti - Huzur Mostar');
    
    // Initialize animations after view is loaded, but only in browser
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
} 