import { TestBed } from '@angular/core/testing';

import { WeatherrserivcesService } from './weatherrserivces.service';

describe('WeatherrserivcesService', () => {
  let service: WeatherrserivcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherrserivcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
