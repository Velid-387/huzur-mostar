import { TestBed } from '@angular/core/testing';
import { Router, Scroll, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';

import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let router: jasmine.SpyObj<Router>;
  let viewportScroller: jasmine.SpyObj<ViewportScroller>;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    // Create spies
    routerEventsSubject = new Subject<any>();
    router = jasmine.createSpyObj('Router', [], { events: routerEventsSubject });
    viewportScroller = jasmine.createSpyObj('ViewportScroller', ['scrollToPosition', 'scrollToAnchor']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: ViewportScroller, useValue: viewportScroller }
      ]
    });

    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle backward navigation with position', () => {
    // Create Scroll instance that matches what the service is expecting
    const scrollEvent = new Scroll(
      new NavigationEnd(1, 'url', 'urlAfterRedirects'),
      [100, 200], // position
      null        // anchor
    );

    // Trigger the Scroll event
    routerEventsSubject.next(scrollEvent);

    // Verify the service called the viewport scroller with the correct position
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([100, 200]);
  });

  it('should handle forward navigation (no position, no anchor)', () => {
    // Create Scroll instance that matches what the service is expecting
    const scrollEvent = new Scroll(
      new NavigationEnd(1, 'url', 'urlAfterRedirects'),
      null, // position
      null  // anchor
    );

    // Trigger the Scroll event
    routerEventsSubject.next(scrollEvent);

    // Verify the service scrolled to top
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });

  it('should handle anchor navigation', (done) => {
    // Spy on the scrollToElementById method
    spyOn(service, 'scrollToElementById');

    // Create Scroll instance that matches what the service is expecting
    const scrollEvent = new Scroll(
      new NavigationEnd(1, 'url', 'urlAfterRedirects'),
      null,         // position
      'test-anchor' // anchor
    );

    // Trigger the Scroll event
    routerEventsSubject.next(scrollEvent);

    // Need to wait for the setTimeout in the service
    setTimeout(() => {
      expect(service.scrollToElementById).toHaveBeenCalledWith('test-anchor');
      done();
    }, 150); // Wait slightly longer than the setTimeout in the service
  });

  it('should scroll to element by ID', () => {
    // Create a test element
    const testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);

    // Spy on the scrollIntoView method
    spyOn(testElement, 'scrollIntoView');

    // Call the service method
    service.scrollToElementById('test-element');

    // Verify scrollIntoView was called with the correct options
    expect(testElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });

    // Clean up
    document.body.removeChild(testElement);
  });

  it('should do nothing if element ID is null', () => {
    // Spy on document.getElementById
    spyOn(document, 'getElementById');

    // Call the service method with null
    service.scrollToElementById(null);

    // Verify getElementById was not called
    expect(document.getElementById).not.toHaveBeenCalled();
  });

  it('should do nothing if element does not exist', () => {
    // Just call the method with a non-existent element id
    // This test verifies that no error is thrown
    service.scrollToElementById('non-existent-element');
    expect(true).toBeTruthy(); // Test passes if no error is thrown
  });

  it('should scroll to top', () => {
    // Spy on window.scrollTo
    spyOn(window, 'scrollTo');

    // Call the service method
    service.scrollToTop();
    
    // Verify scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
