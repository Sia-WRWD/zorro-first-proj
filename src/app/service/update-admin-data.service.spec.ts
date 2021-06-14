import { TestBed } from '@angular/core/testing';

import { UpdateAdminDataService } from './update-admin-data.service';

describe('UpdateAdminDataService', () => {
  let service: UpdateAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
