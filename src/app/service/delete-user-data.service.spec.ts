import { TestBed } from '@angular/core/testing';

import { DeleteUserDataService } from './delete-user-data.service';

describe('DeleteUserDataService', () => {
  let service: DeleteUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
