import { TestBed } from '@angular/core/testing';

import { StateStorageService } from './state-storage.service';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

describe('StateStorageService', () => {
  let service: StateStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService, SessionStorageService]
    });
    service = TestBed.inject(StateStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
