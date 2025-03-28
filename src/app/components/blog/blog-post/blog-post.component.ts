import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../../services/animation.service';
import { BlogService, BlogPost } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private animationService = inject(AnimationService);
  private blogService = inject(BlogService);
  
  post: BlogPost | null = null;
  loading: boolean = true;
  error: boolean = false;
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top when component loads
      window.scrollTo(0, 0);
      
      // Get the post slug from the route parameters
      this.route.paramMap.subscribe(params => {
        const slug = params.get('id');
        
        if (slug) {
          // Try to fetch the post by slug
          this.loading = true;
          this.blogService.getPostBySlug(slug).subscribe({
            next: (post) => {
              this.post = post;
              this.loading = false;
              
              if (post) {
                // Set page title
                document.title = `${post.title} - Huzur Mostar`;
                
                // Initialize animations
                setTimeout(() => {
                  this.animationService.initAnimations();
                }, 100);
              } else {
                this.error = true;
                document.title = 'Post Not Found - Huzur Mostar';
              }
            },
            error: () => {
              this.loading = false;
              this.error = true;
              document.title = 'Error - Huzur Mostar';
            }
          });
        } else {
          this.router.navigate(['/blog']);
        }
      });
    }
  }
  
  goBack(): void {
    this.router.navigate(['/blog']);
  }
} 