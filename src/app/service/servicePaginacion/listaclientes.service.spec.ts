import { TestBed } from '@angular/core/testing';

import { ListaclientesService } from './listaclientes.service';

describe('ListaclientesService', () => {
  let service: ListaclientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaclientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
