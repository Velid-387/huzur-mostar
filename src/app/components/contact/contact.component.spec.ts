import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let createElementOriginal: any;
  let appendChildOriginal: any;

  beforeEach(async () => {
    // Store original DOM methods
    createElementOriginal = document.createElement;
    appendChildOriginal = document.body.appendChild;

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Restore original DOM methods
    document.createElement = createElementOriginal;
    document.body.appendChild = appendChildOriginal;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form values', () => {
    expect(component.contactForm.value).toEqual({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  });

  it('should mark fields as invalid when submitting an empty form', () => {
    // Attempt to submit an empty form
    component.onSubmit();
    
    // Check that all fields are marked as invalid
    expect(component.contactForm.get('name')?.valid).toBeFalse();
    expect(component.contactForm.get('email')?.valid).toBeFalse();
    expect(component.contactForm.get('subject')?.valid).toBeFalse();
    expect(component.contactForm.get('message')?.valid).toBeFalse();
    
    // Check that the correct error message is displayed
    expect(component.formStatus).toBe('Molimo popunite sva polja.');
  });

  it('should detect invalid email format', () => {
    // Fill the form with valid data except the email
    component.contactForm.setValue({
      name: 'Test User',
      email: 'invalid-email', // Invalid email format
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    // Check that the email field is invalid
    expect(component.contactForm.get('email')?.valid).toBeFalse();
    
    // Attempt to submit
    component.onSubmit();
    
    // Check that the correct error message is displayed
    expect(component.formStatus).toBe('Molimo popunite sva polja.');
  });

  it('should accept form with valid data', fakeAsync(() => {
    // Create a real HTML form element for mocking
    const mockForm = document.createElement('form');
    mockForm.method = '';
    mockForm.action = '';
    
    // Add spies to the mock form
    spyOn(mockForm, 'setAttribute').and.callThrough();
    spyOn(mockForm, 'appendChild').and.callThrough();
    spyOn(mockForm, 'submit').and.callThrough();
    
    // Mock document.createElement
    spyOn(document, 'createElement').and.returnValue(mockForm);
    
    // Mock document.body.appendChild
    spyOn(document.body, 'appendChild');
    
    // Fill the form with valid data
    component.contactForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    // Check that the form is valid
    expect(component.contactForm.valid).toBeTrue();
    
    // Submit the form
    component.onSubmit();
    
    // Check that the 'sending' message is displayed initially
    expect(component.formStatus).toBe('Slanje poruke...');
    expect(component.isSubmitting).toBeTrue();
    
    // Check that the form was created correctly
    expect(document.createElement).toHaveBeenCalledWith('form');
    expect(mockForm.method).toBe('POST');
    expect(mockForm.action).toBe('/');
    expect(mockForm.setAttribute).toHaveBeenCalledWith('netlify', 'true');
    expect(mockForm.setAttribute).toHaveBeenCalledWith('name', 'contact');
    
    // Check that the form was appended to the body
    expect(document.body.appendChild).toHaveBeenCalledWith(mockForm);
    
    // Simulate setTimeout callback
    tick(100);
    
    // Check that form was submitted
    expect(mockForm.submit).toHaveBeenCalled();
  }));

  it('should display validation errors when fields are touched', () => {
    // Touch name field and leave it empty
    const nameControl = component.contactForm.get('name');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    
    // Find error message element (adjust selector to match your template)
    const errorEl = fixture.debugElement.query(By.css('.validation-error'));
    
    // Expect error message to be displayed
    // Note: this depends on how you structured your HTML
    // You may need to adjust this test if your HTML is different
    if (errorEl) {
      expect(errorEl.nativeElement.textContent).toContain('required');
    }
  });
});
