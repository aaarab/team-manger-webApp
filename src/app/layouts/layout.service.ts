import { Injectable } from '@angular/core';
import * as constants from "constants";
import {filter, map, Observable, shareReplay} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";


export type Layout = {
  appHeaderDisplay: boolean,
  appFooterDisplay: boolean,
}

export const LAYOUTS = {
  admin: {
    appHeaderDisplay: true,
    appFooterDisplay: true
  },
  auth: {
    appHeaderDisplay: false,
    appFooterDisplay: false
  },
  blank: {
    appHeaderDisplay: false,
    appFooterDisplay: false
  }
} as const;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public readonly layout$: Observable<Layout>

  constructor(private router: Router) {
    this.layout$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => {
        const urlAfterRedirect = (e as NavigationEnd).urlAfterRedirects;
        if(urlAfterRedirect.startsWith('/auth')) {
          return LAYOUTS.auth
        } else if (['/404', '/error', '/accessdenid'].includes(urlAfterRedirect)) {
          return LAYOUTS.blank;
        } else {
          return LAYOUTS.admin
        }
      }),
      shareReplay(1)
    );
  }
}
