import { Directive, ElementRef, Input, OnInit, Renderer2, NgZone } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad: string = '';
  private isErrorHandled: boolean = false;
  private observer: IntersectionObserver | undefined;
  
  constructor(private el: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {}
  
  ngOnInit() {
    // Only create observer if IntersectionObserver is available in browser
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            // Once the image is loaded, no need to observe anymore
            if (this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }
          }
        });
      }, { rootMargin: '200px 0px' }); // Start loading when image is 200px away from viewport
      
      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.loadImage();
    }
  }
  
  private loadImage() {
    if (this.appLazyLoad && !this.isErrorHandled) {
      // If this is an img element
      if (this.el.nativeElement.nodeName === 'IMG') {
        // Create a load event handler
        const handleLoad = () => {
          this.dispatchLoadEvent();
          this.el.nativeElement.removeEventListener('load', handleLoad);
        };
        
        const handleError = () => {
          if (!this.isErrorHandled) {
            this.isErrorHandled = true;
            this.dispatchErrorEvent();
          }
          this.el.nativeElement.removeEventListener('error', handleError);
        };
        
        // Add event listeners before setting src
        this.el.nativeElement.addEventListener('load', handleLoad);
        this.el.nativeElement.addEventListener('error', handleError);
        
        // Set the src attribute which will trigger the load
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.appLazyLoad);
      } 
      // If this is a div or other element with background-image
      else {
        this.renderer.setStyle(
          this.el.nativeElement, 
          'background-image', 
          `url(${this.appLazyLoad})`
        );
        
        // For background images, we can't rely on load events
        // so we'll use an Image object to preload and dispatch events
        const img = new Image();
        img.onload = () => this.dispatchLoadEvent();
        img.onerror = () => {
          if (!this.isErrorHandled) {
            this.isErrorHandled = true;
            this.dispatchErrorEvent();
          }
        };
        img.src = this.appLazyLoad;
      }
    }
  }
  
  private dispatchLoadEvent() {
    this.ngZone.run(() => {
      // Dispatch a custom load event
      this.el.nativeElement.dispatchEvent(new CustomEvent('load', { bubbles: true }));
    });
  }
  
  private dispatchErrorEvent() {
    this.ngZone.run(() => {
      // Dispatch a custom error event
      this.el.nativeElement.dispatchEvent(new CustomEvent('error', { bubbles: true }));
    });
  }
} 