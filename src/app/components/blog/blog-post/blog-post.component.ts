import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
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
  private location = inject(Location);
  
  post: BlogPost | null = null;
  loading: boolean = true;
  error: boolean = false;
  // Store the referrer page information
  private referrerPage: string | null = null;
  
  // To track if sharing is supported and show result messages
  shareSupported: boolean = false;
  shareResult: { success: boolean; message: string } | null = null;
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if Web Share API is supported
      this.shareSupported = !!navigator.share;
      
      // Store the referrer page information if available
      this.storeReferrerPage();
      
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
  
  /**
   * Store the referrer page information
   */
  private storeReferrerPage(): void {
    // Check if we have a document referrer
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      
      // Only store if it's our blog page
      if (referrerUrl.pathname.includes('/blog') && !referrerUrl.pathname.includes('/blog/')) {
        // Get the page query parameter
        const pageParam = referrerUrl.searchParams.get('page');
        if (pageParam) {
          this.referrerPage = pageParam;
        }
      }
    }
    
    // Also check session storage as a fallback
    if (!this.referrerPage && sessionStorage.getItem('blogCurrentPage')) {
      this.referrerPage = sessionStorage.getItem('blogCurrentPage');
    }
  }
  
  /**
   * Share the current article using Web Share API if available,
   * with fallback to copying the URL to clipboard
   */
  sharePost(): void {
    if (!isPlatformBrowser(this.platformId) || !this.post) {
      return;
    }
    
    // Get the current URL
    const url = window.location.href;
    
    // If Web Share API is available, use it
    if (navigator.share) {
      navigator.share({
        title: this.post.title,
        text: this.post.excerpt || 'Provjerite ovaj članak na Huzur Mostar blogu!',
        url: url
      })
      .then(() => {
        this.showShareResult(true, 'Članak uspješno podijeljen!');
      })
      .catch((error) => {
        // Don't show error if user just canceled
        if (error.name !== 'AbortError') {
          this.showShareResult(false, 'Došlo je do greške prilikom dijeljenja.');
        }
      });
    } 
    // Fallback to clipboard
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          this.showShareResult(true, 'Link kopiran u međuspremnik!');
        })
        .catch(() => {
          this.showShareResult(false, 'Nije moguće kopirati link.');
        });
    }
    // Show message if neither is available
    else {
      this.showShareResult(false, 'Dijeljenje nije podržano na ovom uređaju.');
    }
  }
  
  /**
   * Display share result message and hide it after timeout
   */
  private showShareResult(success: boolean, message: string): void {
    this.shareResult = { success, message };
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      this.shareResult = null;
    }, 3000);
  }
  
  /**
   * Navigate back to the blog page, preserving pagination
   */
  goBack(): void {
    if (this.referrerPage && isPlatformBrowser(this.platformId)) {
      // Navigate back to the specific page
      this.router.navigate(['/blog'], { 
        queryParams: { page: this.referrerPage }
      });
    } else {
      // If we don't have referrer info, try the browser history first
      if (isPlatformBrowser(this.platformId) && window.history.length > 1) {
        this.location.back();
      } else {
        // Fallback to blog main page
        this.router.navigate(['/blog']);
      }
    }
  }
} 