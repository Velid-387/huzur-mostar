import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { DarkModeService } from '../../services/dark-mode.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let darkModeServiceSpy: jasmine.SpyObj<DarkModeService>;

  beforeEach(async () => {
    // Create a spy for DarkModeService
    darkModeServiceSpy = jasmine.createSpyObj('DarkModeService', [
      'toggleDarkMode', 'isDark', 'enableDarkMode', 'disableDarkMode'
    ]);
    
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent, 
        RouterTestingModule
      ],
      providers: [
        { provide: DarkModeService, useValue: darkModeServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
