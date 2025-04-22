import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimationService } from './services/animation.service';

describe('Performance Tests', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let performanceObserver: PerformanceObserver;
  let performanceEntries: PerformanceEntry[] = [];

  // Helper function to measure time
  const measureTime = async (callback: () => Promise<void>): Promise<number> => {
    const start = performance.now();
    await callback();
    return performance.now() - start;
  };

  beforeEach(async () => {
    // Set up performance observer
    performanceObserver = new PerformanceObserver((list) => {
      performanceEntries = performanceEntries.concat(list.getEntries());
    });
    
    performanceObserver.observe({
      entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint']
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        AnimationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    performanceObserver.disconnect();
    performanceEntries = [];
  });

  it('should measure initial page load time', fakeAsync(async () => {
    const loadTime = await measureTime(async () => {
      fixture.detectChanges();
      await fixture.whenStable();
    });

    expect(loadTime).toBeDefined();
    console.log(`Page load time: ${loadTime}ms`);
    
    // Get First Contentful Paint
    const fcp = performanceEntries.find(entry => 
      entry.entryType === 'paint' && entry.name === 'first-contentful-paint'
    );
    
    if (fcp) {
      console.log(`First Contentful Paint: ${fcp.startTime}ms`);
      expect(fcp.startTime).toBeLessThan(3000); // Should be under 3 seconds
    }
  }));

  it('should measure image loading performance', fakeAsync(async () => {
    const imageElements = fixture.nativeElement.querySelectorAll('img');
    const imageLoadPromises = Array.from<HTMLImageElement>(imageElements as NodeListOf<HTMLImageElement>).map((img: HTMLImageElement) => {
      return new Promise<number>((resolve) => {
        if (img.complete) {
          resolve(0);
        } else {
          const start = performance.now();
          img.addEventListener('load', () => {
            resolve(performance.now() - start);
          });
          img.addEventListener('error', () => {
            resolve(-1);
          });
        }
      });
    });

    const loadTimes = await Promise.all(imageLoadPromises);
    
    loadTimes.forEach((time, index) => {
      if (time >= 0) {
        console.log(`Image ${index + 1} load time: ${time}ms`);
        expect(time).toBeLessThan(5000); // Should load within 5 seconds
      } else {
        console.error(`Image ${index + 1} failed to load`);
      }
    });

    // Check Largest Contentful Paint
    const lcp = performanceEntries.find(entry => 
      entry.entryType === 'largest-contentful-paint'
    );
    
    if (lcp) {
      console.log(`Largest Contentful Paint: ${lcp.startTime}ms`);
      expect(lcp.startTime).toBeLessThan(4000); // Should be under 4 seconds
    }
  }));

  it('should measure resource loading performance', fakeAsync(async () => {
    const resourceEntries = performanceEntries.filter(entry => 
      entry.entryType === 'resource'
    );

    resourceEntries.forEach(entry => {
      const resource = entry as PerformanceResourceTiming;
      console.log(`Resource: ${resource.name}`);
      console.log(`- Duration: ${resource.duration}ms`);
      console.log(`- Transfer Size: ${resource.transferSize} bytes`);
      
      // Check if resource loading is within acceptable range
      expect(resource.duration).toBeLessThan(10000); // Should load within 10 seconds
    });
  }));
}); 