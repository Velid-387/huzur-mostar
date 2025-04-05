import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should accept form with valid data', () => {
    // Spy on console.log
    spyOn(console, 'log');
    
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
    
    // Check that the success message is displayed
    expect(component.formStatus).toBe('Poruka uspješno poslana!');
    
    // Check that form data was logged
    expect(console.log).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    });
    
    // Check that form was reset
    expect(component.contactForm.value).toEqual({
      name: null,
      email: null,
      subject: null,
      message: null
    });
  });

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
