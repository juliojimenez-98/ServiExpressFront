import { TestBed } from '@angular/core/testing';

import { AdminProveedoresService } from './admin-proveedores.service';

describe('AdminProveedoresService', () => {
  let service: AdminProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
