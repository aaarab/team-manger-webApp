import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {Observable} from "rxjs";
import {createRequestOption} from "../../core/request/request-util";
import {IUser} from "../../entities/user/user.model";

export interface IEventLog {
  action: string;
  attributes: any;
  changes: any
  object_id: number;
  object_type: string;
  original: string;
  request_method: string,
  request_path: string;
  causer_type: string;
  causer_id?: number | null;
  created_at: Date;
  creator?: IUser | null;
  // TODO add type after create account entity
  // account?: IAccount | null;
  account: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventLogService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('event-log');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

  query(req: any): Observable<HttpResponse<IEventLog[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEventLog[]>(this.resourceUrl, { params: options, observe: 'response'});
  }
}
