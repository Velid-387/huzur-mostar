import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService, BlogPostMetadata, BlogPost } from './blog.service';
import { of } from 'rxjs';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Spy on loadMarkdownContent to prevent actual HTTP requests
    spyOn<any>(service, 'loadMarkdownContent').and.returnValue(of('# Test Content\n\nThis is test content.'));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all blog posts metadata', (done) => {
    service.getAllPostsMetadata().subscribe(posts => {
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0].title).toBeDefined();
      expect(posts[0].readingTime).toBeDefined();
      done();
    });
  });

  it('should get post by ID', (done) => {
    const testId = 1;
    
    service.getPostById(testId).subscribe(post => {
      expect(post).not.toBeNull();
      if (post) {
        expect(post.id).toBe(testId);
        expect(post.content).toBeDefined();
        expect(post.readingTime).toBeDefined();
      }
      done();
    });
  });

  it('should return null for non-existent post ID', (done) => {
    const nonExistentId = 9999;
    
    service.getPostById(nonExistentId).subscribe(post => {
      expect(post).toBeNull();
      done();
    });
  });

  it('should get post by slug', (done) => {
    // Get the first post's slug from the test data
    service.getAllPostsMetadata().subscribe(posts => {
      const firstPost = posts[0];
      
      service.getPostBySlug(firstPost.slug).subscribe(post => {
        expect(post).not.toBeNull();
        if (post) {
          expect(post.slug).toBe(firstPost.slug);
          expect(post.content).toBeDefined();
        }
        done();
      });
    });
  });

  it('should calculate reading time based on content length', () => {
    // Access the private method using type assertion
    const calculateReadingTime = (service as any).calculateReadingTime;
    
    // Test with short content
    expect(calculateReadingTime('Short test content')).toBe('1 min citanja');
    
    // Test with longer content (create a string with 2000+ words)
    const longContent = Array(2001).fill('word').join(' ');
    expect(calculateReadingTime(longContent)).toBe('11 min citanja');
  });
}); 