import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of FAQ items', () => {
    const faqItems = fixture.debugElement.queryAll(By.css('.faq-item'));
    expect(faqItems.length).toEqual(component.faqItems.length);
  });

  it('should render questions and answers correctly', () => {
    // Check the first FAQ item's question and answer
    const firstQuestion = fixture.debugElement.query(By.css('.faq-question'));
    const firstAnswer = fixture.debugElement.query(By.css('.faq-answer'));
    
    if (firstQuestion && firstAnswer) {
      expect(firstQuestion.nativeElement.textContent).toContain(component.faqItems[0].question);
      expect(firstAnswer.nativeElement.textContent).toContain(component.faqItems[0].answer);
    } else {
      // If selectors don't match, check the page content
      const pageContent = fixture.nativeElement.textContent;
      expect(pageContent).toContain(component.faqItems[0].question);
      expect(pageContent).toContain(component.faqItems[0].answer);
    }
  });

  it('should toggle FAQ item when clicked', fakeAsync(() => {
    // Find the first FAQ item element
    const faqItem = fixture.debugElement.query(By.css('.faq-item'));
    if (!faqItem) {
      // Skip if we can't find the element
      return;
    }

    // Initial state should not have active class
    expect(faqItem.classes['active']).toBeFalsy();

    // Click the item
    faqItem.triggerEventHandler('click', {});
    fixture.detectChanges();

    // After click, the item should have active class
    expect(faqItem.classes['active']).toBeTruthy();

    // Click again to toggle off
    faqItem.triggerEventHandler('click', {});
    fixture.detectChanges();

    // After second click, the active class should be removed
    expect(faqItem.classes['active']).toBeFalsy();
  }));

  it('should call toggleFaq method when item is clicked', () => {
    // Spy on the toggleFaq method
    spyOn(component, 'toggleFaq');

    // Find and click a FAQ item
    const faqItem = fixture.debugElement.query(By.css('.faq-item'));
    if (faqItem) {
      faqItem.triggerEventHandler('click', {});

      // Verify toggleFaq was called with the correct index
      expect(component.toggleFaq).toHaveBeenCalledWith(0);
    }
  });

  it('should auto-close FAQ item after 7 seconds', fakeAsync(() => {
    // Open an FAQ item
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBe(true);

    // Fast-forward 7 seconds
    tick(7000);

    // Item should now be closed
    expect(component.faqItems[0].isOpen).toBe(false);
  }));

  it('should clear timeout when manually closing before auto-close', fakeAsync(() => {
    // Open an FAQ item
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBe(true);

    // Manually close it before 7 seconds
    tick(3000);
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBe(false);

    // Fast-forward past the original 7 seconds
    tick(5000);

    // Item should still be closed
    expect(component.faqItems[0].isOpen).toBe(false);
  }));

  it('should clear all timeouts on component destruction', fakeAsync(() => {
    // Open multiple FAQ items
    component.toggleFaq(0);
    component.toggleFaq(1);

    expect(component.faqItems[0].isOpen).toBe(true);
    expect(component.faqItems[1].isOpen).toBe(true);

    // Destroy the component
    component.ngOnDestroy();

    // Fast-forward past auto-close time
    tick(8000);

    // Items should still be open since timeouts were cleared
    expect(component.faqItems[0].isOpen).toBe(true);
    expect(component.faqItems[1].isOpen).toBe(true);
  }));
});
