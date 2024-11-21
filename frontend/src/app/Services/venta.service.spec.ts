import { TestBed } from '@angular/core/testing';

import { VentasService } from './Venta.service';

describe('VentaService', () => {
  let service: VentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
