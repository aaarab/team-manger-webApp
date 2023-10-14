import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {MessageService} from "primeng/api";

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of( { account: { id: 123 }} )}
        },
        MessageService
      ]
    })
      .overrideTemplate(AccountDetailComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load account on Init', () => {
      // WHEN
      component.ngOnInit();
      // THEN
      expect(component.account).toEqual(expect.objectContaining({ id: 123 }));
    });
  })
});
