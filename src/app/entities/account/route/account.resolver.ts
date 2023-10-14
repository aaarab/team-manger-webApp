import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EMPTY, mergeMap, Observable, of} from 'rxjs';
import {HttpResponse} from "@angular/common/http";
import { IAccount } from '../account.model';
import {AccountService} from "../service/account.service";

@Injectable({
  providedIn: 'root'
})
export class AccountRoutingResolveService implements Resolve<IAccount | null> {
  constructor(protected service: AccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccount | null>  {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id, { with: 'accountOwner,parentAccount,accountPricelist' }).pipe(
        mergeMap((account: HttpResponse<IAccount>) => {
          if (account.body) {
            return of(account.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
