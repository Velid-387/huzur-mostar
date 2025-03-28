import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private animationService = inject(AnimationService);
  
  // Sample blog posts data - in a real app this would come from a service
  blogPosts = [
    {
      id: 1,
      title: 'Kako pravilno njegovati suho cvijeće',
      excerpt: 'Otkrijte kako da vaši aranžmani od suhog cvijeća traju duže i zadrže svoj lijep izgled.',
      date: '25.03.2024',
      image: 'assets/img/blog/blog-post-1.jpg'
    },
    {
      id: 2,
      title: 'Najbolje biljke za vaš dom',
      excerpt: 'Vodič za izbor idealnih sobnih biljaka prema prostoru i uvjetima u vašem domu.',
      date: '20.03.2024',
      image: 'assets/img/blog/blog-post-2.jpg'
    },
    {
      id: 3,
      title: 'Značenja različitog cvijeća',
      excerpt: 'Saznajte što različite vrste cvijeća simboliziraju kada ih poklanjate nekome.',
      date: '15.03.2024',
      image: 'assets/img/blog/blog-post-3.jpg'
    }
  ];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Any browser-specific initialization
      document.title = 'Blog - Huzur Mostar';
      
      // Scroll to top when blog page loads
      window.scrollTo(0, 0);
      
      // Initialize animations
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
} 