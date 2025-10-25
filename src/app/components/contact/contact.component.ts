import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  private useNetlifyForms: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Determine which backend to use based on current domain
    this.useNetlifyForms = this.shouldUseNetlifyForms();
  }

  /**
   * Determines whether to use Netlify forms based on the current domain
   * Returns true for netlify.app domains, false for huzurmostar.ba domains
   */
  private shouldUseNetlifyForms(): boolean {
    if (typeof window === 'undefined') {
      return environment.useNetlifyForms;
    }

    const hostname = window.location.hostname;

    // Use Netlify forms for:
    // - *.netlify.app domains
    // - localhost (for development)
    const isNetlifyDomain = hostname.includes('netlify.app') || hostname === 'localhost';

    return isNetlifyDomain;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formStatus = 'Slanje poruke...';

      if (this.useNetlifyForms) {
        this.submitToNetlify();
      } else {
        this.submitToPhpBackend();
      }
    } else {
      this.formStatus = 'Molimo popunite sva polja.';
    }
  }

  /**
   * Submits form to Netlify Forms (for netlify.app deployment)
   */
  private submitToNetlify(): void {
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
  }

  /**
   * Submits form to PHP backend (for huzurmostar.ba and stage.huzurmostar.ba)
   */
  private submitToPhpBackend(): void {
    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
      'bot-field': '' // Honeypot field for spam protection
    };

    this.http.post(environment.emailApiUrl, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        if (response.success) {
          this.formStatus = 'Poruka uspješno poslata!';
          this.contactForm.reset();

          // Redirect to success page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/'], { fragment: 'contact' });
            this.formStatus = '';
          }, 2000);
        } else {
          this.formStatus = 'Greška pri slanju poruke. Molimo pokušajte ponovo.';
        }
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.isSubmitting = false;
        this.formStatus = 'Greška pri slanju poruke. Molimo pokušajte ponovo.';
      }
    });
  }
}