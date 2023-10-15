import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DialogService} from "primeng/dynamicdialog";

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TopbarComponent ],
      providers: [LocalStorageService, SessionStorageService, DialogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
