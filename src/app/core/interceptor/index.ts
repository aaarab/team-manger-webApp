import {Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthExpiredInterceptor} from "./auth-expired.interceptor";
import {UnauthorizedActionInterceptor} from "./unauthorized-action.interceptor";

export const httpInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedActionInterceptor,
    multi: true,
  }
];
