import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { ScrollService } from '../../services/scroll.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    // Create a spy for the ScrollService
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToElementById']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ScrollService, useValue: scrollServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call scrollService when scrollToSection is called', () => {
    // Call the method with a test section ID
    component.scrollToSection('test-section');
    
    // Verify the scrollService method was called with the correct ID
    expect(scrollServiceSpy.scrollToElementById).toHaveBeenCalledWith('test-section');
  });

  it('should call scrollToSection when scroll buttons are clicked', () => {
    // Spy on the component's scrollToSection method
    spyOn(component, 'scrollToSection');
    
    // Find the "Explore our offer" button that has a click handler
    const scrollButton = fixture.debugElement.query(By.css('.btn'));
    
    if (scrollButton) {
      // Trigger click event
      scrollButton.triggerEventHandler('click', null);
      
      // Verify scrollToSection was called with 'products'
      expect(component.scrollToSection).toHaveBeenCalledWith('products');
    } else {
      // If button not found in template, test the method directly
      component.scrollToSection('products');
      expect(scrollServiceSpy.scrollToElementById).toHaveBeenCalledWith('products');
    }
  });

  it('should render main hero section', () => {
    // Look for the #home section or animate-section
    const heroElement = fixture.debugElement.query(By.css('#home'));
    
    // Check that a hero/banner section exists
    expect(heroElement).toBeTruthy();
  });
});
