import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, forkJoin } from 'rxjs';
import { marked } from 'marked';

export interface BlogPostMetadata {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  fileName: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  
  private blogPostsMetadata: BlogPostMetadata[] = [
    {
      id: 1,
      title: 'Sreća je znati uživati u procesu',
      excerpt: 'Čitav je život jedan proces',
      date: 'Apr 14, 2025',
      image: '/assets/img/blog/huzur-blog-1.jpg',
      slug: 'sreca-je-znati-uivati-u-procesu',
      fileName: 'huzur-blog-2.md',
      readingTime: ''
    },
    {
      id: 2,
      title: 'Mala velika godina dana',
      excerpt: 'Krug se zatvara da se novi otvori',
      date: 'Apr 15, 2025',
      image: '/assets/img/blog/huzur-blog-2.jpg',
      slug: 'krug-se-zatvara-da-se-novi-otvori',
      fileName: 'huzur-blog-1.md',
      readingTime: ''
    },
    {
      id: 3,
      title: 'Ono što je tvoje, pronaći će put do tebe',
      excerpt: 'Putnici',
      date: 'Okt 19, 2025',
      image: '/assets/img/blog/huzur-blog-3.jpg',
      slug: 'ono-sto-je-tvoje-pronaci-ce-put-do-tebe',
      fileName: 'huzur-blog-3.md',
      readingTime: ''
    }
  ];

  constructor() {
    // Initialize the Markdown parser
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true     // Enable GitHub flavored markdown
    });
  }

  /**
   * Get all blog post metadata (without content)
   */
  getAllPostsMetadata(): Observable<BlogPostMetadata[]> {
    // Create an array of observables for loading each post's content
    const postObservables = this.blogPostsMetadata.map(metadata =>
      this.loadMarkdownContent(metadata.fileName).pipe(
        map(content => ({
          ...metadata,
          readingTime: this.calculateReadingTime(content)
        })),
        catchError(error => {
          console.error(`Error loading blog post ${metadata.id}:`, error);
          return of(metadata); // Return original metadata if loading fails
        })
      )
    );

    // Combine all observables and reverse to show last added first
    return forkJoin(postObservables).pipe(
      map(posts => posts.reverse())
    );
  }

  /**
   * Calculate reading time in minutes based on content
   */
  private calculateReadingTime(content: string): string {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min čitanja`;
  }

  /**
   * Get a single blog post by ID
   */
  getPostById(id: number): Observable<BlogPost | null> {
    const metadata = this.blogPostsMetadata.find(post => post.id === id);
    
    if (!metadata) {
      return of(null);
    }
    
    return this.loadMarkdownContent(metadata.fileName).pipe(
      map(content => {
        const parsedContent = this.parseMarkdown(content);
        return {
          ...metadata,
          content: parsedContent,
          readingTime: this.calculateReadingTime(content)
        };
      }),
      catchError(error => {
        console.error(`Error loading blog post ${id}:`, error);
        return of(null);
      })
    );
  }
  
  /**
   * Get a single blog post by slug
   */
  getPostBySlug(slug: string): Observable<BlogPost | null> {
    const metadata = this.blogPostsMetadata.find(post => post.slug === slug);
    
    if (!metadata) {
      return of(null);
    }
    
    return this.loadMarkdownContent(metadata.fileName).pipe(
      map(content => {
        const parsedContent = this.parseMarkdown(content);
        return {
          ...metadata,
          content: parsedContent,
          readingTime: this.calculateReadingTime(content)
        };
      }),
      catchError(error => {
        console.error(`Error loading blog post with slug ${slug}:`, error);
        return of(null);
      })
    );
  }
  
  /**
   * Load posts for a specific page
   */
  getPostsForPage(page: number, postsPerPage: number): Observable<BlogPostMetadata[]> {
    return this.getAllPostsMetadata().pipe(
      map(posts => {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return posts.slice(startIndex, endIndex);
      })
    );
  }
  
  /**
   * Get the total number of pages
   */
  getTotalPages(postsPerPage: number): Observable<number> {
    return this.getAllPostsMetadata().pipe(
      map(posts => Math.ceil(posts.length / postsPerPage))
    );
  }

  /**
   * Load the Markdown content from a file
   */
  private loadMarkdownContent(fileName: string): Observable<string> {
    return this.http.get(`assets/blog-posts/${fileName}`, { responseType: 'text' });
  }
  
  /**
   * Parse Markdown content to HTML
   */
  private parseMarkdown(markdown: string): string {
    return marked.parse(markdown) as string;
  }
} 