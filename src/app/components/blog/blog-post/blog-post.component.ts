import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../../services/animation.service';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { TitleService } from '../../../services/title.service';

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
  private titleService = inject(TitleService);
  
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
      
      // Store the current page number from URL or default to 1
      const urlParams = new URLSearchParams(window.location.search);
      const currentPage = urlParams.get('page') || '1';
      sessionStorage.setItem('blogCurrentPage', currentPage);
      
      // Store referrer page information
      this.storeReferrerPage();
      
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
                this.titleService.setTitle(post.title);
                
                // Initialize animations after a short delay to ensure content is rendered
                setTimeout(() => {
                  this.animationService.initAnimations();
                }, 100);
              } else {
                this.error = true;
                this.titleService.setTitle('Post Not Found');
              }
            },
            error: () => {
              this.loading = false;
              this.error = true;
              this.titleService.setTitle('Error');
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

    // Check if Web Share API is available and can be used
    // Note: navigator.share requires HTTPS and user gesture
    if (navigator.share && typeof navigator.share === 'function') {
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
          // If share failed, try clipboard fallback
          this.fallbackToCopyLink(url);
        }
      });
    }
    // Fallback to clipboard if Web Share API is not available
    else {
      this.fallbackToCopyLink(url);
    }
  }

  /**
   * Fallback method to copy link to clipboard
   */
  private fallbackToCopyLink(url: string): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          this.showShareResult(true, 'Link kopiran u međuspremnik!');
        })
        .catch(() => {
          // Final fallback: create a temporary input element
          this.copyToClipboardFallback(url);
        });
    } else {
      // Use old-school copy method
      this.copyToClipboardFallback(url);
    }
  }

  /**
   * Old-school clipboard copy method that works even without HTTPS
   */
  private copyToClipboardFallback(url: string): void {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        this.showShareResult(true, 'Link kopiran u međuspremnik!');
      } else {
        this.showShareResult(false, 'Molimo ručno kopirajte link iz adresne trake.');
      }
    } catch (err) {
      this.showShareResult(false, 'Molimo ručno kopirajte link iz adresne trake.');
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