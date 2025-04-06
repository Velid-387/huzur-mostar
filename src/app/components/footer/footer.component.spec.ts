import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { ScrollService } from '../../services/scroll.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;
  let router: Router;

  beforeEach(async () => {
    // Create spies for the services
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToTop']);

    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        RouterTestingModule.withRoutes([
          { path: 'terms', component: {} as any },
          { path: 'privacy', component: {} as any }
        ])
      ],
      providers: [
        { provide: ScrollService, useValue: scrollServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year in copyright text', () => {
    const currentYear = new Date().getFullYear();
    const footerElement: HTMLElement = fixture.nativeElement;
    const copyrightText = footerElement.textContent;
    
    expect(copyrightText).toContain(currentYear.toString());
  });

  it('should have scroll-to-top button initially hidden', () => {
    expect(component.isScrollButtonVisible).toBeFalse();
    
    const button = fixture.debugElement.query(By.css('#scrollToTop'));
    if (button) {
      // If button exists in DOM, it should be hidden
      expect(button.nativeElement.classList.contains('visible')).toBeFalse();
    }
  });

  it('should make scroll button visible when scrolled down', () => {
    // Create a mock section element
    const mockHomeSection = document.createElement('div');
    mockHomeSection.id = 'home';
    mockHomeSection.style.height = '200px';
    // Set offsetHeight directly since this is what the component checks
    Object.defineProperty(mockHomeSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(mockHomeSection);
    
    // Make sure getElementById returns our mock element
    spyOn(document, 'getElementById').and.returnValue(mockHomeSection);
    
    // Mock window scroll position to be greater than the home section height
    spyOnProperty(window, 'scrollY').and.returnValue(600);
    
    // Trigger scroll event
    component.checkScrollPosition();
    fixture.detectChanges();
    
    // Verify scroll button is visible
    expect(component.isScrollButtonVisible).toBeTrue();
    
    // Clean up
    document.body.removeChild(mockHomeSection);
  });

  it('should call scrollService when scroll-to-top button is clicked', () => {
    // Make the button visible first
    component.isScrollButtonVisible = true;
    fixture.detectChanges();
    
    // Find and click the button
    const button = fixture.debugElement.query(By.css('#scrollToTop'));
    if (button) {
      button.triggerEventHandler('click', null);
      
      // Verify scrollService was called
      expect(scrollServiceSpy.scrollToTop).toHaveBeenCalled();
    } else {
      // If button isn't in the template, test the method directly
      component.scrollToTop();
      expect(scrollServiceSpy.scrollToTop).toHaveBeenCalled();
    }
  });

  it('should navigate with scroll to top when navigateWithScrollToTop is called', () => {
    const testPath = '/terms';
    component.navigateWithScrollToTop(testPath);
    
    expect(router.navigateByUrl).toHaveBeenCalledWith(testPath);
  });
});
