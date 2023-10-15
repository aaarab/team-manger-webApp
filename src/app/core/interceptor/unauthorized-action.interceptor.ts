import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class UnauthorizedActionInterceptor implements HttpInterceptor {

  constructor(protected router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigate(['/accessdenied']);
          }
        }
      })
    );
  }
}
