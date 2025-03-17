import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  submitContactForm(formData: any): Observable<any> {
    // This is a mock implementation
    // In a real app, you would send this data to your backend
    console.log('Form data submitted:', formData);
    
    // Simulate a server response with a delay
    return of({ success: true, message: 'Form submitted successfully' }).pipe(
      delay(1000)
    );
  }
}