import { TestBed, async, inject } from '@angular/core/testing';

import { MesaGuard } from './mesa.guard';

describe('MesaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MesaGuard]
    });
  });

  it('should ...', inject([MesaGuard], (guard: MesaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
