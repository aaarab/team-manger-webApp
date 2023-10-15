import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, ReplaySubject, shareReplay, tap} from "rxjs";
import {SessionStorageService} from "ngx-webstorage";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Account } from "./account.model";
import {StateStorageService} from "./state-storage.service";
import {ApplicationConfigService} from "../config/application-config.service";
import { AuthorityUserRoles } from "../../entities/enumerations/authority-type.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
    private applicationConfigService: ApplicationConfigService
  ) {}

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: { roles?: string[] | string, permissions?: string[] | string }): boolean {
    if (!this.userIdentity) {
      return false;
    }

    if (this.userIdentity.roles?.some(role => role.name === AuthorityUserRoles.admin)) {
      return true;
    }

    if (!Array.isArray(authorities.roles)) {
      authorities.roles = authorities.roles ? [authorities.roles] : [];
    }

    if (!Array.isArray(authorities.permissions) ) {
      authorities.permissions = authorities.permissions ? [authorities.permissions] : [];
    }

    // No Permissions or Roles are provided.
    if (authorities.permissions?.length === 0 && authorities.roles?.length === 0) {
      return true;
    }

    // check if user has roles.
    if (authorities.roles?.length && authorities.permissions.length === 0) {
      return this.userIdentity.roles!.some(role => authorities.roles?.includes(role.name));
    }

    // check if user has permissions.
    if (!authorities.permissions.length && authorities.roles.length === 0) {
      return this.userIdentity.permissions!.some((permission: string) => authorities.permissions!.includes(permission));
    }

    // check if user has Role and Permission.
    return this.userIdentity.permissions!.some(
        (permission: string) => authorities.permissions!.includes(permission)
      )
      && this.userIdentity.roles!.some(
        role => authorities.roles!.includes(role.name)
      );

  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => of(null)),
        tap((account: Account | null) => {
          this.authenticate(account);
          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<Account> {
    return this.http.post<Account>(this.applicationConfigService.getEndpointFor('verify-token'), null, { observe: 'response' })
      .pipe(map(res => res.body!));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}

