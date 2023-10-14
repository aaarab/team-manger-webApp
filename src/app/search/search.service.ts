import { Injectable } from '@angular/core';
import {ApplicationConfigService} from "../core/config/application-config.service";
import {Observable} from "rxjs";
import {createRequestOption} from "../core/request/request-util";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IEmployer} from "../entities/employer/employer.model";
import {IAccount} from "../entities/account/account.model";

export interface ISearchResult {
  accounts: IAccount[],
  employers: IEmployer[],
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('search');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

  query(req: any): Observable<HttpResponse<ISearchResult>> {
    const options = createRequestOption(req);
    return this.http.get<ISearchResult>(this.resourceUrl, { params: options, observe: 'response'});
  }
}
