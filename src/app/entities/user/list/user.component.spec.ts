import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {BehaviorSubject, of} from 'rxjs';

import { UserService } from '../service/user.service';

import { UserComponent } from './user.component';
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";

describe('User Management Component', () => {
  let comp: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'user', component: UserComponent }]), HttpClientTestingModule],
      declarations: [UserComponent],
      providers: [
        ConfirmationService,
        MessageService,
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: {data: of(), queryParams: new BehaviorSubject({})},
        },
      ],
    })
      .overrideTemplate(UserComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UserService);
    confirmationService = TestBed.inject(ConfirmationService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123, name: 'demo', email: 'demo@email.com' }],
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
    expect(comp.users?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to userService', () => {
      const entity = { id: 123, name: 'demo', email: 'demo@email.com' };
      jest.spyOn(service, 'getUserIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUserIdentifier).toHaveBeenCalledWith(entity);
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
