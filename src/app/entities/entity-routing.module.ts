import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employer',
        data: { pageTitle: 'Employers' },
        loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
      },
      // {
      //   path: 'account',
      //   data: { pageTitle: 'Accounts' },
      //   loadChildren: () => import('./account/accounte.module').then(m => m.AccounteModule),
      // },
    ]),
  ],
})
export class EntityRoutingModule {}
