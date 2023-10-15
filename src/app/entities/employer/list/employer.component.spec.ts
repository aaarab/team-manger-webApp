import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {BehaviorSubject, of} from 'rxjs';

import { EmployerService } from '../service/employer.service';

import { EmployerComponent } from './employer.component';
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

describe('Employer Management Component', () => {
  let comp: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;
  let service: EmployerService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'employer', component: EmployerComponent }]), HttpClientTestingModule],
      declarations: [EmployerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {data: of(), queryParams: new BehaviorSubject({})},
        },
        ConfirmationService,
        MessageService,
        DialogService,
      ],
    })
      .overrideTemplate(EmployerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmployerService);
    confirmationService = TestBed.inject(ConfirmationService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.employers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to employerService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEmployerIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEmployerIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });

  it('should call delete service using confirmDialog', fakeAsync(() => {
    // GIVEN
    jest.spyOn(service, 'delete').mockReturnValue(of({} as any));
    jest.spyOn(confirmationService, 'confirm').mockImplementation((confirmation: Confirmation) => {
      if (confirmation.accept) {
        confirmation.accept();
      }
      return confirmationService;
    });

    // WHEN
    comp.delete(123);

    // THEN
    expect(confirmationService.confirm).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalledWith(123);
  }));
});
