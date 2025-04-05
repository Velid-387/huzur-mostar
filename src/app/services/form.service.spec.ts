import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return an observable when submitting form data', () => {
    // Setup
    const testFormData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    };
    
    // Spy on console.log
    spyOn(console, 'log');
    
    // Execute and verify
    const result = service.submitContactForm(testFormData);
    
    // Verify that it returns an Observable (by checking if it has subscribe method)
    expect(result.subscribe).toBeDefined();
    
    // Verify console.log was called with the form data
    expect(console.log).toHaveBeenCalledWith('Form data submitted:', testFormData);
  });
  
  it('should return a successful response after delay', (done) => {
    // Setup
    const testFormData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    };
    
    // Execute
    service.submitContactForm(testFormData).subscribe(response => {
      // Verify
      expect(response).toEqual({ 
        success: true, 
        message: 'Form submitted successfully' 
      });
      done();
    });
  });
});
