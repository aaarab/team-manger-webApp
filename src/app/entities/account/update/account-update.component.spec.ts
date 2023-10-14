import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateComponent } from './account-update.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "primeng/api";
import {of, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { HttpResponse } from '@angular/common/http';
import {AccountService} from "../service/account.service";
import {IAccount} from "../account.model";

describe('AccountUpdateComponent', () => {
  let component: AccountUpdateComponent;
  let fixture: ComponentFixture<AccountUpdateComponent>;
  let service: AccountService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ AccountUpdateComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data:  of({ account: {id: 123} } ) }
        },
        MessageService
      ]
    })
      .overrideTemplate(AccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountUpdateComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(AccountService);
    fixture.detectChanges();
  });


  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const account: IAccount = { id: 456, name: 'demo', email: 'demo@contact.com' };

      activatedRoute.data = of({ account });
      component.ngOnInit();

      expect(component.editForm.value.id).toEqual(account.id);
    });
  });
  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccount>>();
      const account: IAccount = { id: 123, name: 'demo', email: 'demo@email.com' };
      jest.spyOn(service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(component, 'previousState');
      activatedRoute.data = of({ account });
      component.ngOnInit();

      // WHEN
      component.save();
      expect(component.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: account }));
      saveSubject.complete();

      // THEN
      expect(component.previousState).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(expect.objectContaining(account));
      expect(component.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccount>>();
      const account = {  name: 'demo-4', email: 'demo@email.com' };
      jest.spyOn(service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(component, 'previousState');
      activatedRoute.data = of({ account: null });
      component.ngOnInit();
      component.editForm.reset(account);

      // WHEN
      component.save();
      expect(component.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: account as IAccount }));
      saveSubject.complete();

      // THEN
      expect(service.create).toHaveBeenCalled();
      expect(component.isSaving).toEqual(false);
      expect(component.previousState).toHaveBeenCalled();
    });
  });

});
