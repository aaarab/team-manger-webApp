import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserFormService } from './usere-form.service';
import { UserService } from '../service/usere.service';
import { IUsere } from '../usere.model';

import { UserUpdateComponent } from './usere-update.component';

describe('Usere Management Update Component', () => {
  let comp: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usereFormService: UserFormService;
  let usereService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserUpdateComponent],
      providers: [
        FormBuilder,
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
    usereFormService = TestBed.inject(UserFormService);
    usereService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const usere: IUsere = { id: 456 };

      activatedRoute.data = of({ usere });
      comp.ngOnInit();

      expect(comp.usere).toEqual(usere);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsere>>();
      const usere = { id: 123 };
      jest.spyOn(usereFormService, 'getUsere').mockReturnValue(usere);
      jest.spyOn(usereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usere }));
      saveSubject.complete();

      // THEN
      expect(usereFormService.getUsere).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usereService.update).toHaveBeenCalledWith(expect.objectContaining(usere));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsere>>();
      const usere = { id: 123 };
      jest.spyOn(usereFormService, 'getUsere').mockReturnValue({ id: null });
      jest.spyOn(usereService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usere: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usere }));
      saveSubject.complete();

      // THEN
      expect(usereFormService.getUsere).toHaveBeenCalled();
      expect(usereService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsere>>();
      const usere = { id: 123 };
      jest.spyOn(usereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usereService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
