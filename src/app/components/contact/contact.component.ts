import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  formStatus: string = '';
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formStatus = 'Slanje poruke...';
      
      // Create the form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/form-success';
      form.setAttribute('netlify', 'true');
      form.setAttribute('name', 'contact');
      form.style.display = 'none';
      
      // Add form-name field
      let formNameField = document.createElement('input');
      formNameField.type = 'hidden';
      formNameField.name = 'form-name';
      formNameField.value = 'contact';
      form.appendChild(formNameField);
      
      // Add form fields from the Angular form
      Object.keys(this.contactForm.value).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = this.contactForm.value[key];
        form.appendChild(input);
      });
      
      // Append to body, submit the form
      document.body.appendChild(form);
      
      // Submit the form
      setTimeout(() => {
        form.submit();
        // Note: The page will navigate to the success page due to the form action
      }, 100);
    } else {
      this.formStatus = 'Molimo popunite sva polja.';
    }
  }
}