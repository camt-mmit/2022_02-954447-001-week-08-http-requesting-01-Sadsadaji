import { TestBed } from '@angular/core/testing';

import { SpeciesServiceService } from './species-service.service';

describe('SpeciesServiceService', () => {
  let service: SpeciesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeciesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
