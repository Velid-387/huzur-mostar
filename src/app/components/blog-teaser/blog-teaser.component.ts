import { Component, ElementRef, OnInit, afterNextRender, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPostMetadata } from '../../services/blog.service';
import { BotanicalComponent } from '../shared/botanical/botanical.component';

/**
 * Landing page teaser for the newest blog post. The whole card links to the post;
 * a smaller link underneath goes to the blog index.
 */
@Component({
  selector: 'app-blog-teaser',
  standalone: true,
  imports: [CommonModule, RouterLink, BotanicalComponent],
  templateUrl: './blog-teaser.component.html',
  styleUrls: ['./blog-teaser.component.css']
})
export class BlogTeaserComponent implements OnInit {
  private blogService = inject(BlogService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  post = signal<BlogPostMetadata | null>(null);
  imageBroken = signal(false);

  constructor() {
    // The page is prerendered, so the cover may have already failed to load before
    // hydration attached the (error) handler. Check the element once we are in the browser.
    afterNextRender(() => {
      const img = this.host.nativeElement.querySelector<HTMLImageElement>('.teaser-media img');
      if (img && img.complete && img.naturalWidth === 0) {
        this.imageBroken.set(true);
      }
    });
  }

  ngOnInit(): void {
    this.blogService.getLatestPostMetadata().subscribe(post => this.post.set(post));
  }

  onImageError(): void {
    this.imageBroken.set(true);
  }
}
