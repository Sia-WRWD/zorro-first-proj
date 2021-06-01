import { TestBed } from '@angular/core/testing';

import { FetchAdminDataService } from './fetch-admin-data.service';

describe('FetchAdminDataService', () => {
  let service: FetchAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
