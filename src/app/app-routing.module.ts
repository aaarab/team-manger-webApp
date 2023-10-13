import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from "./layouts/error/error.route";
import {UserRouteAccessService} from "./core/auth/user-route-access.service";

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
    {
      path: 'search',
      loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
      canActivate: [UserRouteAccessService],
    },
    ...errorRoute,
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
