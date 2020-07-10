import { TestBed } from '@angular/core/testing';

import { SatisfaccionService } from './satisfaccion.service';

describe('SatisfaccionService', () => {
  let service: SatisfaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatisfaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
