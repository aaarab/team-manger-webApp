import { TestBed } from '@angular/core/testing';

import { AccountRoutingResolveService } from './account.resolver';
import {ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Router} from "@angular/router";
import {AccountService} from "../service/account.service";
import {IAccount} from "../account.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpResponse} from "@angular/common/http";
import { of } from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import { DatePipe } from '@angular/common';

describe('Account routing resolve service', () => {
  let routingResolveService: AccountRoutingResolveService;
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: AccountService;
  let resultAccount: IAccount | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
        DatePipe,
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(AccountRoutingResolveService);
    service = TestBed.inject(AccountService);
    resultAccount = null;
  });

  describe('resolve', () => {
    it('should return IAccount returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAccount).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAccount = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAccount).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null }) as any));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAccount).toEqual(null);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
