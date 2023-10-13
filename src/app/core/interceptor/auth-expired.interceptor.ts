import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";
import {LoginService} from "../../auth/login/login.service";
import {StateStorageService} from "../auth/state-storage.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status === 401 && error.url) {
            const previousUrl = this.router.routerState.snapshot.url;
            if (!previousUrl.includes('auth/login')) {
              this.stateStorageService.storeUrl(previousUrl);
            }
            this.loginService.logout();
            this.router.navigate(['/auth/login']);
          }
        },
      })
    );
  }
}
