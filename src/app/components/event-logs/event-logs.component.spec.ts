import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogsComponent } from './event-logs.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

describe('EventLogsComponent', () => {
  let component: EventLogsComponent;
  let fixture: ComponentFixture<EventLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EventLogsComponent, HttpClientTestingModule ],
      providers: [DynamicDialogConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
