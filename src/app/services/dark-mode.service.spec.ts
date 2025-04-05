import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;
  let document: Document;
  let localStorageGetSpy: jasmine.Spy;
  let localStorageSetSpy: jasmine.Spy;

  beforeEach(() => {
    // Create spies for localStorage methods
    localStorageGetSpy = spyOn(localStorage, 'getItem');
    localStorageSetSpy = spyOn(localStorage, 'setItem');

    // Default return value for getItem
    localStorageGetSpy.and.returnValue(null);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    service = TestBed.inject(DarkModeService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check localStorage for saved preference on initialization', () => {
    // When the service is initialized in beforeEach, it should check localStorage
    expect(localStorage.getItem).toHaveBeenCalledWith('darkMode');
  });

  it('should initialize dark mode if saved in localStorage', () => {
    // Reset the testing module for a fresh test
    TestBed.resetTestingModule();
    
    // Set up spies again
    localStorageGetSpy.and.returnValue('enabled');
    spyOn(document.body.classList, 'add');
    
    // Configure testing module
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    // Get a new instance which should initialize with dark mode
    service = TestBed.inject(DarkModeService);
    
    // Verify dark mode was enabled
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-mode');
    expect(service.isDark()).toBeTrue();
  });

  it('should toggle from light to dark mode', () => {
    // Setup: ensure we're starting in light mode
    expect(service.isDark()).toBeFalse();
    spyOn(document.body.classList, 'add');

    // Execute
    service.toggleDarkMode();

    // Verify
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'enabled');
    expect(service.isDark()).toBeTrue();
  });

  it('should toggle from dark to light mode', () => {
    // Setup: start in dark mode by directly calling the method
    service.enableDarkMode();
    
    // Reset the spy counts
    localStorageSetSpy.calls.reset();
    
    spyOn(document.body.classList, 'remove');

    // Execute
    service.toggleDarkMode();

    // Verify
    expect(document.body.classList.remove).toHaveBeenCalledWith('dark-mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'disabled');
    expect(service.isDark()).toBeFalse();
  });

  it('should enable dark mode', () => {
    spyOn(document.body.classList, 'add');
    
    service.enableDarkMode();
    
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'enabled');
    expect(service.isDark()).toBeTrue();
  });

  it('should disable dark mode', () => {
    // First enable it so we can test disabling
    service.enableDarkMode();
    
    // Reset the spy counts
    localStorageSetSpy.calls.reset();
    
    spyOn(document.body.classList, 'remove');
    
    service.disableDarkMode();
    
    expect(document.body.classList.remove).toHaveBeenCalledWith('dark-mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'disabled');
    expect(service.isDark()).toBeFalse();
  });

  it('should return correct dark mode state', () => {
    expect(service.isDark()).toBeFalse();
    
    service.enableDarkMode();
    expect(service.isDark()).toBeTrue();
    
    service.disableDarkMode();
    expect(service.isDark()).toBeFalse();
  });
});
