import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let originalFetch: any;

  beforeEach(async () => {
    // Store the original fetch
    originalFetch = window.fetch;

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Restore the original fetch
    window.fetch = originalFetch;
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
    // Mock fetch to return a successful response
    window.fetch = jasmine.createSpy('fetch').and.returnValue(
      Promise.resolve({
        ok: true
      })
    );
    
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
    
    // Check that fetch was called with the correct data
    expect(fetch).toHaveBeenCalledWith('/', jasmine.any(Object));
    
    // Resolve all promises
    tick();
    fixture.detectChanges();
    
    // Check that the success message is displayed and form is reset
    expect(component.formStatus).toBe('Poruka uspješno poslana!');
    expect(component.isSubmitting).toBeFalse();
    
    // FormGroup.reset() sets values to null, not empty strings
    const resetFormValue = component.contactForm.value;
    expect(resetFormValue.name).toBeFalsy();
    expect(resetFormValue.email).toBeFalsy();
    expect(resetFormValue.subject).toBeFalsy();
    expect(resetFormValue.message).toBeFalsy();
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

  it('should handle submission errors', fakeAsync(() => {
    // Mock fetch to return an error
    window.fetch = jasmine.createSpy('fetch').and.returnValue(
      Promise.reject(new Error('Network error'))
    );

    // Fill the form with valid data
    component.contactForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    // Submit the form
    component.onSubmit();
    
    // Resolve all promises (including the rejected one)
    tick();
    fixture.detectChanges();
    
    // Check that the error message is displayed
    expect(component.formStatus).toBe('Došlo je do greške. Pokušajte ponovo.');
    expect(component.isSubmitting).toBeFalse();
  }));
});
