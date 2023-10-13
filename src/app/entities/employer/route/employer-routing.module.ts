import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployerComponent } from '../list/employer.component';
import { EmployerDetailComponent } from '../detail/employer-detail.component';
import { EmployerUpdateComponent } from '../update/employer-update.component';
import { EmployerRoutingResolveService } from './employer-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const employerRoute: Routes = [
  {
    path: '',
    component: EmployerComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployerDetailComponent,
    resolve: {
      employer: EmployerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployerUpdateComponent,
    resolve: {
      employer: EmployerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployerUpdateComponent,
    resolve: {
      employer: EmployerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employerRoute)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
