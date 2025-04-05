import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  let service: AnimationService;
  let originalIntersectionObserver: any;
  
  // Mock for IntersectionObserver
  class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    
    constructor(private callback: IntersectionObserverCallback, private options?: IntersectionObserverInit) {}
    
    observe(target: Element): void {
      // Store the target to trigger intersection later
      this.mockIntersect([
        {
          isIntersecting: true,
          target,
        } as IntersectionObserverEntry
      ]);
    }
    
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
    
    // Method to simulate intersection
    mockIntersect(entries: IntersectionObserverEntry[]): void {
      this.callback(entries, this as any);
    }
  }

  beforeEach(() => {
    // Save original IntersectionObserver
    originalIntersectionObserver = window.IntersectionObserver;
    
    // Mock IntersectionObserver before tests
    window.IntersectionObserver = MockIntersectionObserver as any;
    
    TestBed.configureTestingModule({
      providers: [
        AnimationService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    service = TestBed.inject(AnimationService);
  });

  afterEach(() => {
    // Restore original IntersectionObserver
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add animated class to intersecting elements', () => {
    // Create elements to animate
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    
    element1.classList.add('animate-item');
    element2.classList.add('animate-item');
    
    document.body.appendChild(element1);
    document.body.appendChild(element2);
    
    // Spy on querySelectorAll to return our test elements
    spyOn(document, 'querySelectorAll').and.returnValue([element1, element2] as any);
    
    // Call the method
    service.initAnimations();
    
    // Verify elements received 'animated' class
    expect(element1.classList.contains('animated')).toBeTrue();
    expect(element2.classList.contains('animated')).toBeTrue();
    
    // Clean up
    document.body.removeChild(element1);
    document.body.removeChild(element2);
  });
});
