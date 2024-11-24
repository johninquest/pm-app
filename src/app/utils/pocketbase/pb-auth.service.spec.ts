import { TestBed } from '@angular/core/testing';

import { PbAuthService } from './pb-auth.service';

describe('PbAuthService', () => {
  let service: PbAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PbAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
