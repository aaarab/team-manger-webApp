import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserFormService } from './user-form.service';
import { UserService } from '../service/user.service';
import { IUser } from '../user.model';

import { UserUpdateComponent } from './user-update.component';
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {SessionStorageService} from "ngx-webstorage";

describe('User Management Update Component', () => {
  let comp: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userFormService: UserFormService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserUpdateComponent],
      providers: [
        MessageService,
        FormBuilder,
        DatePipe,
        SessionStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userFormService = TestBed.inject(UserFormService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const user: IUser = { id: 456, name: 'demo', email: 'demp@email.com' };

      activatedRoute.data = of({ user });
      comp.ngOnInit();

      expect(comp.editForm.value.name).toEqual(user.name);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser>>();
      const user = { id: 123, name: 'demo', email: 'demp@email.com' };
      jest.spyOn(userFormService, 'getUser').mockReturnValue(user);
      jest.spyOn(userService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: user }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(userService.update).toHaveBeenCalledWith(expect.objectContaining(user));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser>>();
      const user = { id: 123, name: 'demo', email: 'demp@email.com' };
      jest.spyOn(userFormService, 'getUser').mockReturnValue(user);
      jest.spyOn(userService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user: null });
      comp.ngOnInit();
      comp.editForm.patchValue({
        ...user,
        id: null,
      });

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: user }));
      saveSubject.complete();

      // THEN
      expect(userService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser>>();
      const user = { id: 123, name: 'demo', email: 'demp@email.com' };
      jest.spyOn(userService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
