import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { getAccountIdentifier, IAccount } from "../account.model";
import { createRequestOption } from "../../../core/request/request-util";
import { ApplicationConfigService } from "../../../core/config/application-config.service";

export type EntityResponseType = HttpResponse<IAccount>;
export type EntityArrayResponseType = HttpResponse<IAccount[]>;

type RestOf<T extends IAccount> = Omit<T, 'created_at' | 'updated_at'> & {
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type RestAccount = RestOf<IAccount>;


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('account');

  constructor(
    protected http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  create(account: IAccount): Observable<EntityResponseType> {
    return this.http.post<IAccount>(this.resourceUrl, account, { observe: 'response' });
  }

  update(account: IAccount): Observable<EntityResponseType> {
    return this.http.put<IAccount>(`${this.resourceUrl}/${getAccountIdentifier(account) as number}`,account, { observe: 'response' });
  }

  partialUpdate(account: IAccount): Observable<EntityResponseType> {
    return this.http.patch<IAccount>(`${this.resourceUrl}/${getAccountIdentifier(account) as number}`, account, { observe: 'response' });
  }

  find(id: number, req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccount>(`${this.resourceUrl}/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccount[]>(`${this.resourceUrl}`, { params: options, observe: 'response' })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountIdentifier(account: Pick<IAccount, 'id'>): number {
    return account.id;
  }
}
