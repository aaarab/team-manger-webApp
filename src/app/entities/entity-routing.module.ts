import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        data: { pageTitle: 'Accounts' },
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'employer',
        data: { pageTitle: 'Employers' },
        loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
      },
      {
        path: 'user',
        data: { pageTitle: 'Users' },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
