import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclComponent } from './acl.component';
import {SessionStorageService} from "ngx-webstorage";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AclComponent', () => {
  let component: AclComponent;
  let fixture: ComponentFixture<AclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AclComponent, HttpClientTestingModule ],
      providers: [SessionStorageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
