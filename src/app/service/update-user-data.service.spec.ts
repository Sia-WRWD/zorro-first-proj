import { TestBed } from '@angular/core/testing';

import { UpdateUserDataService } from './update-user-data.service';

describe('UpdateUserDataService', () => {
  let service: UpdateUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
