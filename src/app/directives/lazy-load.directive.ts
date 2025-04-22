import { Directive, ElementRef, Input, OnInit, Renderer2, NgZone, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad: string = '';
  @Output() imageLoaded = new EventEmitter<void>();
  @Output() imageError = new EventEmitter<void>();
  
  private isLoaded: boolean = false;
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
    if (this.appLazyLoad && !this.isErrorHandled && !this.isLoaded) {
      // If this is an img element
      if (this.el.nativeElement.nodeName === 'IMG') {
        // Create a load event handler
        const handleLoad = () => {
          if (!this.isLoaded) {
            this.isLoaded = true;
            this.ngZone.run(() => {
              this.imageLoaded.emit();
            });
          }
          this.el.nativeElement.removeEventListener('load', handleLoad);
        };
        
        const handleError = () => {
          if (!this.isErrorHandled) {
            this.isErrorHandled = true;
            this.ngZone.run(() => {
              this.imageError.emit();
            });
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
        img.onload = () => {
          if (!this.isLoaded) {
            this.isLoaded = true;
            this.ngZone.run(() => {
              this.imageLoaded.emit();
            });
          }
        };
        img.onerror = () => {
          if (!this.isErrorHandled) {
            this.isErrorHandled = true;
            this.ngZone.run(() => {
              this.imageError.emit();
            });
          }
        };
        img.src = this.appLazyLoad;
      }
    }
  }
} 