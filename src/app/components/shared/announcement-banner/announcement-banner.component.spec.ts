import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AnnouncementBannerComponent } from './announcement-banner.component';
import { AnnouncementBannerService, BannerConfig } from '../../../services/announcement-banner.service';

describe('AnnouncementBannerComponent', () => {
  let component: AnnouncementBannerComponent;
  let fixture: ComponentFixture<AnnouncementBannerComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementBannerComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementBannerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AnnouncementBannerService);
    httpMock = TestBed.inject(HttpTestingController);

    // Respond to the config request
    const req = httpMock.match('/banner-config.json');
    if (req.length > 0) {
      req[0].flush(mockConfig);
    }

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with config from service', () => {
    expect(component.config).toBeTruthy();
  });

  it('should call service dismissBanner when onDismiss is called', (done) => {
    spyOn(service, 'dismissBanner');
    component.onDismiss();

    setTimeout(() => {
      expect(service.dismissBanner).toHaveBeenCalled();
      done();
    }, 350);
  });

  it('should call service expandBanner when onExpandFromCompact is called', () => {
    spyOn(service, 'expandBanner');
    component.onExpandFromCompact();
    expect(service.expandBanner).toHaveBeenCalled();
  });

  it('should call service hideBanner when onCloseCompact is called', (done) => {
    spyOn(service, 'hideBanner');
    component.onCloseCompact();

    setTimeout(() => {
      expect(service.hideBanner).toHaveBeenCalled();
      done();
    }, 350);
  });

  it('should return correct icon for vacation type', () => {
    component.config = { ...component.config, type: 'vacation' };
    expect(component.getBannerIcon()).toBe('🌺');
  });

  it('should return correct icon for warning type', () => {
    component.config = { ...component.config, type: 'warning' };
    expect(component.getBannerIcon()).toBe('⚠️');
  });

  it('should return correct icon for info type', () => {
    component.config = { ...component.config, type: 'info' };
    expect(component.getBannerIcon()).toBe('ℹ️');
  });

  it('should return correct CSS class for banner type', () => {
    component.config = { ...component.config, type: 'vacation' };
    expect(component.getBannerTypeClass()).toBe('banner-vacation');
  });
});
