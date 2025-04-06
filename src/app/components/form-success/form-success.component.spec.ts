import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { FormSuccessComponent } from './form-success.component';

describe('FormSuccessComponent', () => {
  let component: FormSuccessComponent;
  let fixture: ComponentFixture<FormSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSuccessComponent, RouterModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
