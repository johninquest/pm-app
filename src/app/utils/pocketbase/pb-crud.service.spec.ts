import { TestBed } from '@angular/core/testing';

import { PbCrudService } from './pb-crud.service';

describe('PbCrudService', () => {
  let service: PbCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PbCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
