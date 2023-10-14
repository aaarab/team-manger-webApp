import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AccountListComponent} from './account-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountService} from "app/entities/account/service/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {BehaviorSubject, of} from "rxjs";
import {Table} from "primeng/table";
import {HttpResponse} from "@angular/common/http";

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let service: AccountService;
  let confirmationService: ConfirmationService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
      declarations: [AccountListComponent],
      providers: [
        MessageService,
        ConfirmationService,
        {
          provide: ActivatedRoute,
          useValue: {data: of(), queryParams: new BehaviorSubject({})}
        }
      ]
    })
      .overrideTemplate(AccountListComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AccountService);
    confirmationService = TestBed.inject(ConfirmationService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.get(Router);
    jest.spyOn(router, 'navigate').mockImplementation();

    component.accountTable = { filters: {}, createLazyLoadMetadata: () => undefined } as Table;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call load all on init', fakeAsync(() => {
    // GIVEN
    jest.spyOn(service, 'paginate').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
        }) as any
      )
    );

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(service.paginate).toHaveBeenCalled();
    expect(component.accounts?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  }));

  it('should load a page', fakeAsync(() => {
    // GIVEN
    jest.spyOn(service, 'paginate').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
        })
      )
    );

    // WHEN
    fixture.detectChanges();
    tick(100);
    (activatedRoute.queryParams as BehaviorSubject<any>).next({ first: 20 });

    // THEN
    expect(service.paginate).toHaveBeenCalled();
    expect(component.accounts?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  }));
  //
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
    component.delete(123);

    // THEN
    expect(confirmationService.confirm).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalledWith(123);
  }));
});
