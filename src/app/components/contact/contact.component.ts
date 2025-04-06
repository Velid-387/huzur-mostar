import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { 
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
      
      const formData = new FormData();
      formData.append('form-name', 'contact');
      Object.keys(this.contactForm.value).forEach(key => {
        formData.append(key, this.contactForm.value[key]);
      });
      
      fetch('/', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        this.formStatus = 'Poruka uspješno poslana!';
        this.contactForm.reset();
        this.isSubmitting = false;
      })
      .catch(error => {
        console.error('Error:', error);
        this.formStatus = 'Došlo je do greške. Pokušajte ponovo.';
        this.isSubmitting = false;
      });
    } else {
      this.formStatus = 'Molimo popunite sva polja.';
    }
  }
}