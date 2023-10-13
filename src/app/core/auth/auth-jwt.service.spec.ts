import { TestBed } from '@angular/core/testing';

import { AuthServerProvider } from './auth-jwt.service';

describe('AuthJwtService', () => {
  let service: AuthServerProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServerProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
