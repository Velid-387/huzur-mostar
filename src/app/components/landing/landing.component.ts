import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ProductsComponent } from '../products/products.component';
import { FaqComponent } from '../faq/faq.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactComponent } from '../contact/contact.component';

import { AnimationService } from '../../services/animation.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    FaqComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private animationService = inject(AnimationService);
  private titleService = inject(TitleService);
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit(): void {
    // Set the default title
    this.titleService.setTitle();
    
    // Initialize animations after view is loaded, but only in browser
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
} 