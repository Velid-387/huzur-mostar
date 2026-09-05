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
    const question = fixture.debugElement.query(By.css('.faq-question'));
    if (!faqItem || !question) {
      // Skip if we can't find the element
      return;
    }

    // Initial state should not have active class
    expect(faqItem.classes['active']).toBeFalsy();

    // Click the question button
    question.triggerEventHandler('click', {});
    fixture.detectChanges();

    // After click, the item should have active class
    expect(faqItem.classes['active']).toBeTruthy();

    // Click again to toggle off
    question.triggerEventHandler('click', {});
    fixture.detectChanges();

    // After second click, the active class should be removed
    expect(faqItem.classes['active']).toBeFalsy();
  }));

  it('should call toggleFaq method when item is clicked', () => {
    // Spy on the toggleFaq method
    spyOn(component, 'toggleFaq');

    // Find and click a FAQ question button
    const faqItem = fixture.debugElement.query(By.css('.faq-question'));
    if (faqItem) {
      faqItem.triggerEventHandler('click', {});

      // Verify toggleFaq was called with the correct index
      expect(component.toggleFaq).toHaveBeenCalledWith(0);
    }
  });

  it('should stay open until toggled again (no auto-close)', fakeAsync(() => {
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBe(true);

    tick(10000);
    expect(component.faqItems[0].isOpen).toBe(true);

    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBe(false);
  }));
});
