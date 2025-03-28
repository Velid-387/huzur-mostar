import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { BlogService, BlogPostMetadata } from '../../services/blog.service';

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
  private blogService = inject(BlogService);
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  
  // Posts to display on current page
  blogPosts: BlogPostMetadata[] = [];
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top when blog page loads
      window.scrollTo(0, 0);
      
      // Set page title
      document.title = 'Blog - Huzur Mostar';
      
      // Get total pages and load first page
      this.blogService.getTotalPages(this.itemsPerPage).subscribe(totalPages => {
        this.totalPages = totalPages;
        this.loadPage(1);
      });
      
      // Initialize animations
      setTimeout(() => {
        this.animationService.initAnimations();
      }, 100);
    }
  }
  
  loadPage(pageNumber: number): void {
    // Validate page number
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > this.totalPages) pageNumber = this.totalPages;
    
    // Update current page
    this.currentPage = pageNumber;
    
    // Get posts for current page from service
    this.blogService.getPostsForPage(pageNumber, this.itemsPerPage).subscribe(posts => {
      this.blogPosts = posts;
      
      // Scroll to top when changing pages
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
  // Helper function to generate an array for pagination
  getPageNumbers(): number[] {
    // Create an array of page numbers to display
    // If there are more than 5 pages, we'll use ellipsis
    if (this.totalPages <= 5) {
      // If 5 or fewer pages, show all numbers
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      // If more than 5 pages, handle the display with ellipsis
      const pages: number[] = [];
      
      // Always show first page
      pages.push(1);
      
      // Determine range around current page
      if (this.currentPage <= 3) {
        // First few pages: show 1, 2, 3, ..., last
        pages.push(2, 3, -1, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Last few pages: show 1, ..., last-2, last-1, last
        pages.push(-1, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        // Middle pages: show 1, ..., current-1, current, current+1, ..., last
        pages.push(-1, this.currentPage - 1, this.currentPage, this.currentPage + 1, -1, this.totalPages);
      }
      
      return pages;
    }
  }
} 