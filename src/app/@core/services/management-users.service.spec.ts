import { TestBed, inject } from '@angular/core/testing';

import { ManagementUsersService } from './management-users.service';

describe('ManagementUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagementUsersService]
    });
  });

  it('should be created', inject([ManagementUsersService], (service: ManagementUsersService) => {
    expect(service).toBeTruthy();
  }));
});
