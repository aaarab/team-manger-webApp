import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {map, Observable} from 'rxjs';

import { IUser } from '../user.model';
import {Router} from "@angular/router";
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {DatePipe} from "@angular/common";
import {DATE_FORMAT} from "../../../core/constants/input.contants";

export type PartialUpdateUser = Partial<IUser> & Pick<IUser, 'id'>;
export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;

type RestOf<T extends IUser> = Omit<T, 'birthday'> & {
  birthday?: string | null;
}

export type RestUser = RestOf<IUser>;

@Injectable({ providedIn: 'root' })
export class UserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('user');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected router: Router,
    protected datePipe: DatePipe,
  ) {
  }

  create(user: IUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(user);
    return this.http.post<RestUser>(this.applicationConfigService.getEndpointFor('user'), copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(user: IUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(user);
    return this.http.put<RestUser>(`${this.applicationConfigService.getEndpointFor('user')}/${this.getUserIdentifier(user)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));

  }

  partialUpdate(user: IUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(user);
    return this.http.patch<RestUser>(`${this.applicationConfigService.getEndpointFor('user')}/${this.getUserIdentifier(user)}`, user, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestUser>(`${this.applicationConfigService.getEndpointFor('user')}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.applicationConfigService.getEndpointFor('user'), { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('user')}/${id}`, { observe: 'response' });
  }

  updateProfile(user: IUser, id: number): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(`${this.applicationConfigService.getEndpointFor('user/update-profile')}/${id}`, user, { observe: 'response'} );
  }

  getUserIdentifier(user: Pick<IUser, 'id'>): number {
    return user.id;
  }

  compareUser(o1: Pick<IUser, 'id'> | null, o2: Pick<IUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserIdentifier(o1) === this.getUserIdentifier(o2) : o1 === o2;
  }


  protected convertResponseFromServer(res: HttpResponse<RestUser>): HttpResponse<IUser> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null
    });
  }

  protected convertDateFromServer(restUser: RestUser): IUser {
    return {
      ...restUser,
      birthday: restUser.birthday ? new Date(restUser.birthday) : null,
    }
  }

  protected convertDateFromClient<T extends IUser>(user: T): RestOf<T> {
    return  {
      ...user,
      birthday: user.birthday ? this.datePipe.transform(user.birthday, DATE_FORMAT) : null,
    }
  }
}
