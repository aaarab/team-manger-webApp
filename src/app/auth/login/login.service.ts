import { Injectable } from '@angular/core';
import {mergeMap, Observable} from "rxjs";
import {AccountService} from "../../core/auth/account.service";
import {Login} from "./login.model";
import {Account} from "../../core/auth/account.model";
import {AuthServerProvider} from "../../core/auth/auth-jwt.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private accountService: AccountService ,
    private authServerProvider: AuthServerProvider
  ) { }

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)))
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
