import { TestBed } from '@angular/core/testing';

import { NutritionsService } from './nutritions.service';

describe('NutritionsService', () => {
  let service: NutritionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
