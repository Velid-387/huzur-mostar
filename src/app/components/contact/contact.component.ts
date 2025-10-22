import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  private isNetlify: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Detect if we're on Netlify or GlobalHost (only in browser)
    this.isNetlify = this.detectNetlifyEnvironment();
  }

  /**
   * Detects if the site is running on Netlify
   * SSR-safe: only checks window when running in browser
   */
  private detectNetlifyEnvironment(): boolean {
    // Check if we're running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const hostname = window.location.hostname;
      // Check if the hostname contains netlify.app or your specific Netlify domain
      return hostname.includes('netlify.app') || hostname.includes('netlify.com');
    }
    // Default to PHP API when running on server (will be re-evaluated in browser)
    return false;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formStatus = 'Slanje poruke...';

      if (this.isNetlify) {
        // Use Netlify Forms
        this.submitToNetlify();
      } else {
        // Use PHP API for GlobalHost
        this.submitToPhpApi();
      }
    } else {
      this.formStatus = 'Molimo popunite sva polja.';
    }
  }

  /**
   * Submit form to Netlify Forms (original method)
   */
  private submitToNetlify() {
    // Create the form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/form-success';
    form.setAttribute('netlify', 'true');
    form.setAttribute('name', 'contact');
    form.style.display = 'none';

    // Add form-name field
    const formNameField = document.createElement('input');
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

    // Append to body and submit
    document.body.appendChild(form);

    setTimeout(() => {
      form.submit();
    }, 100);
  }

  /**
   * Submit form to PHP API (for GlobalHost)
   */
  private submitToPhpApi() {
    const formData = this.contactForm.value;
    const apiUrl = `${environment.apiUrl}/send-email.php`;

    this.http.post<{ success: boolean; message?: string; error?: string }>(apiUrl, formData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.formStatus = 'Poruka uspješno poslana!';
            this.contactForm.reset();
            // Navigate to success page after a short delay
            setTimeout(() => {
              this.router.navigate(['/form-success']);
            }, 1500);
          } else {
            this.formStatus = `Greška: ${response.error || 'Nepoznata greška'}`;
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error sending email:', error);
          this.formStatus = 'Greška prilikom slanja poruke. Molimo pokušajte ponovo.';
        }
      });
  }
}