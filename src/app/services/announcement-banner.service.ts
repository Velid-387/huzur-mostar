import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BannerConfig {
  enabled: boolean;
  message: string;
  startDate: string;
  endDate: string;
  type: 'info' | 'warning' | 'vacation';
  dismissible: boolean;
  persistDismissalHours: number;
}

export type BannerMode = 'full' | 'compact' | 'hidden';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementBannerService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'announcement_banner_dismissed';

  private bannerModeSubject = new BehaviorSubject<BannerMode>('hidden');
  public bannerMode$: Observable<BannerMode> = this.bannerModeSubject.asObservable();

  private config: BannerConfig = environment.announcementBanner;

  constructor() {
    this.initializeBannerState();
  }

  /**
   * Initialize banner state based on configuration and user's previous dismissal
   */
  private initializeBannerState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.shouldShowBanner()) {
      this.bannerModeSubject.next('hidden');
      return;
    }

    // Check if user has previously dismissed the banner
    if (this.isDismissed()) {
      // Show compact version if previously dismissed
      this.bannerModeSubject.next('compact');
    } else {
      // Show full version on first visit
      this.bannerModeSubject.next('full');
    }
  }

  /**
   * Check if banner should be shown based on enabled flag and date range
   */
  private shouldShowBanner(): boolean {
    if (!this.config.enabled) {
      return false;
    }

    const now = new Date();
    const startDate = new Date(this.config.startDate);
    const endDate = new Date(this.config.endDate);

    // Set time to start of day for accurate date comparison
    now.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return now >= startDate && now <= endDate;
  }

  /**
   * Check if banner has been dismissed and dismissal is still valid
   */
  private isDismissed(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const dismissedData = localStorage.getItem(this.STORAGE_KEY);
    if (!dismissedData) {
      return false;
    }

    try {
      const { timestamp } = JSON.parse(dismissedData);
      const dismissedTime = new Date(timestamp);
      const now = new Date();
      const hoursSinceDismissal = (now.getTime() - dismissedTime.getTime()) / (1000 * 60 * 60);

      // If dismissal has expired, clear it and return false
      if (hoursSinceDismissal >= this.config.persistDismissalHours) {
        localStorage.removeItem(this.STORAGE_KEY);
        return false;
      }

      return true;
    } catch (e) {
      // If there's an error parsing, clear the storage
      localStorage.removeItem(this.STORAGE_KEY);
      return false;
    }
  }

  /**
   * Dismiss the full banner and switch to compact mode
   */
  dismissBanner(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Store dismissal timestamp
    const dismissalData = {
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dismissalData));

    // Switch to compact mode
    this.bannerModeSubject.next('compact');
  }

  /**
   * Completely hide the banner (used when closing compact mode)
   */
  hideBanner(): void {
    this.bannerModeSubject.next('hidden');
  }

  /**
   * Expand banner back to full mode
   */
  expandBanner(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Clear dismissal from storage
    localStorage.removeItem(this.STORAGE_KEY);

    // Switch to full mode
    this.bannerModeSubject.next('full');
  }

  /**
   * Get current banner configuration
   */
  getConfig(): BannerConfig {
    return this.config;
  }

  /**
   * Get current banner mode
   */
  getCurrentMode(): BannerMode {
    return this.bannerModeSubject.value;
  }
}
