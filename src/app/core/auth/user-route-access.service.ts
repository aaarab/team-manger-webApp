import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {map, Observable, of} from "rxjs";
import {AccountService} from "./account.service";
import {StateStorageService} from "./state-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserRouteAccessService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private stateStorageService: StateStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map((account) => {
        if (account) {
          // TODO check user authorities,
          return true;
        }
        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}
