import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmployer, NewEmployer } from '../employer.model';
import { ApplicationConfigService } from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";

export type PartialUpdateEmployer = Partial<IEmployer> & Pick<IEmployer, 'id'>;

export type EntityResponseType = HttpResponse<IEmployer>;
export type EntityArrayResponseType = HttpResponse<IEmployer[]>;

@Injectable({ providedIn: 'root' })
export class EmployerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('employer');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employer: NewEmployer): Observable<EntityResponseType> {
    return this.http.post<IEmployer>(this.resourceUrl, employer, { observe: 'response' });
  }

  update(employer: IEmployer): Observable<EntityResponseType> {
    return this.http.put<IEmployer>(`${this.resourceUrl}/${this.getEmployerIdentifier(employer)}`, employer, { observe: 'response' });
  }

  partialUpdate(employer: PartialUpdateEmployer): Observable<EntityResponseType> {
    return this.http.patch<IEmployer>(`${this.resourceUrl}/${this.getEmployerIdentifier(employer)}`, employer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmployer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployerIdentifier(employer: Pick<IEmployer, 'id'>): number {
    return employer.id;
  }

  compareEmployer(o1: Pick<IEmployer, 'id'> | null, o2: Pick<IEmployer, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployerIdentifier(o1) === this.getEmployerIdentifier(o2) : o1 === o2;
  }
}
