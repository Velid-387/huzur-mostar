import { TestBed } from '@angular/core/testing';
import { AnnouncementBannerService } from './announcement-banner.service';

describe('AnnouncementBannerService', () => {
  let service: AnnouncementBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementBannerService);
    // Clear localStorage before each test
    localStorage.clear();
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
