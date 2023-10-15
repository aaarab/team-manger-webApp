import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorityUserRoles } from "./enumerations/authority-type.model";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        data: {
          pageTitle: 'Accounts',
          authorities: {
            roles: [AuthorityUserRoles.admin], //only admins allowed to access accounts.
          }
        },
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'user',
        data: {
          pageTitle: 'Users',
        },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'employer',
        data: {
          pageTitle: 'Employers',
        },
        loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
      }
    ]),
  ],
})
export class EntityRoutingModule {}
