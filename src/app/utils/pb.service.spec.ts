import { TestBed } from '@angular/core/testing';

import { PbService } from './pb.service';

describe('PbService', () => {
  let service: PbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
