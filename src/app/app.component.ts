import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { FaqComponent } from './components/faq/faq.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    FaqComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    ScrollToTopComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private animationService: AnimationService) {}
  
  ngOnInit(): void {
    // Initialize animations after view is loaded
    setTimeout(() => {
      this.animationService.initAnimations();
    }, 100);
  }
}