import { Injectable } from '@angular/core';
import {MenuItem} from "primeng/api";
import {filter, map, Observable} from "rxjs";
import {AccountService} from "../../../core/auth/account.service";
import {AuthorityUserRoles} from "../../../entities/enumerations/authority-type.model";

@Injectable({
  providedIn: 'root'
})
export class TopbarMenuService {

  readonly menuItems$!: Observable<MenuItem[]>;

  constructor(private accountService: AccountService) {
    this.menuItems$ = this.accountService.getAuthenticationState().pipe(
      filter((account) => !!account ),
      map((account) => {
        const menuItem: MenuItem[] = [];

        if (account!.roles?.some(role => role.name === AuthorityUserRoles.admin)) {
          menuItem.push(
            {
              label: 'Accounts',
              icon: 'users',
              routerLink: ['/account']
            },
            {
              label: 'Users',
              icon: 'users',
              routerLink: ['/user']
            }
          );
        }

        if (
          account!.roles?.some(role => role.name === AuthorityUserRoles.admin)
          || this.accountService.hasAnyAuthority({ permissions: 'employers.index'})
        ) {
          menuItem.push({
            label: 'Employers',
            icon: 'user',
            routerLink: ['/employer']
          });
        }

        menuItem.push({
          label: 'Profile',
          icon: 'user',
          routerLink: ['/user/profile']
        });

        return menuItem;
      })
    )
  }
}
