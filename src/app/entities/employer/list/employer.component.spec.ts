import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EmployerService } from '../service/employer.service';

import { EmployerComponent } from './employer.component';

describe('Employer Management Component', () => {
  let comp: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;
  let service: EmployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'employer', component: EmployerComponent }]), HttpClientTestingModule],
      declarations: [EmployerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(EmployerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmployerService);

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
});
