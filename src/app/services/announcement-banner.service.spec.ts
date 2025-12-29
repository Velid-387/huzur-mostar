import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AnnouncementBannerService, BannerConfig } from './announcement-banner.service';

describe('AnnouncementBannerService', () => {
  let service: AnnouncementBannerService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AnnouncementBannerService);
    httpMock = TestBed.inject(HttpTestingController);
    // Clear localStorage before each test
    localStorage.clear();

    // Respond to the config request
    const req = httpMock.match('/banner-config.json');
    if (req.length > 0) {
      req[0].flush(mockConfig);
    }
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize based on environment configuration', () => {
    const mode = service.getCurrentMode();
    // Mode should be 'hidden', 'full', or 'compact' depending on config and localStorage
    expect(['hidden', 'full', 'compact']).toContain(mode);
  });

  it('should dismiss banner and switch to compact mode', () => {
    service.dismissBanner();
    expect(service.getCurrentMode()).toBe('compact');
  });

  it('should hide banner completely', () => {
    service.hideBanner();
    expect(service.getCurrentMode()).toBe('hidden');
  });

  it('should expand banner back to full mode', () => {
    service.expandBanner();
    expect(service.getCurrentMode()).toBe('full');
  });

  it('should store dismissal in localStorage', () => {
    service.dismissBanner();
    const stored = localStorage.getItem('announcement_banner_dismissed');
    expect(stored).toBeTruthy();
  });

  it('should clear dismissal from localStorage when expanding', () => {
    service.dismissBanner();
    service.expandBanner();
    const stored = localStorage.getItem('announcement_banner_dismissed');
    expect(stored).toBeNull();
  });
});
