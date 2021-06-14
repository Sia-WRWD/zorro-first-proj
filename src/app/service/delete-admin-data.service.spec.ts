import { TestBed } from '@angular/core/testing';

import { DeleteAdminDataService } from './delete-admin-data.service';

describe('DeleteAdminDataService', () => {
  let service: DeleteAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
