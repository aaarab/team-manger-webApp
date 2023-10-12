import { Injectable } from '@angular/core';
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class TopbarMenuService {

  readonly menuItems!: MenuItem[];

  constructor() {
    // TODO make it observable.
    this.menuItems = [
      {
        label: 'Accounts',
        icon: 'users',
        routerLink: ['/account']
      },
      {
        label: 'Employers',
        icon: 'user',
        routerLink: ['/employer']
      },
      {
        label: 'Users',
        icon: 'users',
        routerLink: ['/users']
      }
    ];
  }

}
