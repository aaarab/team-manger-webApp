import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployer } from '../employer.model';
import { EmployerService } from '../service/employer.service';

@Injectable({ providedIn: 'root' })
export class EmployerRoutingResolveService implements Resolve<IEmployer | null> {
  constructor(protected service: EmployerService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployer | null | never> {
    const id = route.params['id'];
    if (id) {
      const serverQuery = { with: 'account' };
      return this.service.find(id, serverQuery).pipe(
        mergeMap((employer: HttpResponse<IEmployer>) => {
          if (employer.body) {
            return of(employer.body);
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
