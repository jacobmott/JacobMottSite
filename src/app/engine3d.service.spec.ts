import { TestBed } from '@angular/core/testing';

import { Engine3dService } from './engine3d.service';

describe('Engine3dService', () => {
  let service: Engine3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Engine3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
