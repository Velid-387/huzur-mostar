import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AboutComponent } from './about.component';
import { ScrollService } from '../../services/scroll.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    // Create a spy for the ScrollService
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToElementById']);

    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: ScrollService, useValue: scrollServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
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

  it('should have about section content', () => {
    const aboutContent = fixture.debugElement.query(By.css('.about-content, .about-section'));
    expect(aboutContent).toBeTruthy();
  });

  it('should render company history or description', () => {
    // Get the component's text content
    const textContent = fixture.nativeElement.textContent;
    
    // Check for expected keywords that should be present in an About section
    // This is a flexible test that works even if the exact text changes
    const hasExpectedKeywords = 
      textContent.includes('Huzur') || 
      textContent.includes('cvjećara') || 
      textContent.includes('Mostar') ||
      textContent.includes('povijest') ||
      textContent.includes('o nama');
    
    expect(hasExpectedKeywords).toBeTrue();
  });

  it('should have at least one image', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBeGreaterThan(0);
  });
});
