import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID } from '@angular/core';
import { AnimationService } from './services/animation.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerConfig } from './services/announcement-banner.service';

describe('AppComponent', () => {
  let animationServiceSpy: jasmine.SpyObj<AnimationService>;
  let httpMock: HttpTestingController;

  const mockConfig: BannerConfig = {
    enabled: true,
    message: 'Test message',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    type: 'info',
    dismissible: true,
    persistDismissalHours: 24
  };

  beforeEach(async () => {
    // Create a spy for the AnimationService
    animationServiceSpy = jasmine.createSpyObj('AnimationService', ['initAnimations']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AnimationService, useValue: animationServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements like app-header, etc.
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // Respond to the banner config request
    const req = httpMock.match('/banner-config.json');
    if (req.length > 0) {
      req[0].flush(mockConfig);
    }

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize animations after a timeout in browser environment', (done) => {
    const fixture = TestBed.createComponent(AppComponent);

    // Respond to the banner config request
    const req = httpMock.match('/banner-config.json');
    if (req.length > 0) {
      req[0].flush(mockConfig);
    }

    fixture.detectChanges();

    setTimeout(() => {
      expect(animationServiceSpy.initAnimations).toHaveBeenCalled();
      done();
    }, 150); // Slightly longer than the timeout in component
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // Respond to the banner config request
    const req = httpMock.match('/banner-config.json');
    if (req.length > 0) {
      req[0].flush(mockConfig);
    }

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for the presence of router-outlet
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
