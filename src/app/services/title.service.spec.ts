import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(() => {
    // Create Title service spy
    const spy = jasmine.createSpyObj('Title', ['setTitle']);
    
    TestBed.configureTestingModule({
      providers: [
        TitleService,
        { provide: Title, useValue: spy }
      ]
    });
    
    service = TestBed.inject(TitleService);
    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set base title when no title is provided', () => {
    service.setTitle();
    expect(titleService.setTitle).toHaveBeenCalledWith('Huzur Mostar');
  });

  it('should set combined title when title is provided', () => {
    service.setTitle('Test Page');
    expect(titleService.setTitle).toHaveBeenCalledWith('Test Page - Huzur Mostar');
  });
}); 