import { TestBed } from '@angular/core/testing';

import { AuthServerProvider } from './auth-jwt.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

describe('AuthJwtService', () => {
  let service: AuthServerProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, SessionStorageService]
    });
    service = TestBed.inject(AuthServerProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
