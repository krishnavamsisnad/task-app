import { TestBed } from '@angular/core/testing';

import { PraticualrService } from './praticualr.service';

describe('PraticualrService', () => {
  let service: PraticualrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PraticualrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
