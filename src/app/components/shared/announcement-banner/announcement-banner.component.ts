import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnnouncementBannerService,
  BannerMode,
  BannerConfig
} from '../../../services/announcement-banner.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-announcement-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-banner.component.html',
  styleUrls: ['./announcement-banner.component.css']
})
export class AnnouncementBannerComponent implements OnInit, OnDestroy {
  private bannerService = inject(AnnouncementBannerService);
  private destroy$ = new Subject<void>();

  bannerMode: BannerMode = 'hidden';
  config!: BannerConfig;
  isAnimatingOut = false;

  ngOnInit(): void {
    this.config = this.bannerService.getConfig();

    // Subscribe to banner mode changes
    this.bannerService.bannerMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mode => {
        this.bannerMode = mode;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle dismiss button click - close full banner and switch to compact
   */
  onDismiss(): void {
    this.isAnimatingOut = true;
    setTimeout(() => {
      this.bannerService.dismissBanner();
      this.isAnimatingOut = false;
    }, 300); // Match CSS animation duration
  }

  /**
   * Handle compact banner click - expand back to full view
   */
  onExpandFromCompact(): void {
    this.bannerService.expandBanner();
  }

  /**
   * Close compact banner completely
   */
  onCloseCompact(): void {
    this.isAnimatingOut = true;
    setTimeout(() => {
      this.bannerService.hideBanner();
      this.isAnimatingOut = false;
    }, 300);
  }

  /**
   * Get CSS class based on banner type
   */
  getBannerTypeClass(): string {
    return `banner-${this.config.type}`;
  }

  /**
   * Get icon for the banner type
   */
  getBannerIcon(): string {
    switch (this.config.type) {
      case 'vacation':
        return '🌺';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  }
}
