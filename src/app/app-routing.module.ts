import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from "./layouts/error/error.route";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
    },
    {
      path: '',
      loadChildren: () => import('./entities/entity-routing.module').then(m => m.EntityRoutingModule)
    },
    ...errorRoute,
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
