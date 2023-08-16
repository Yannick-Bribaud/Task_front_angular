import { TestBed } from '@angular/core/testing';

import { UserRoleServices } from './user-role.service';

describe('UserRoleService', () => {
  let service: UserRoleServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
