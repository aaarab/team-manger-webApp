import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployerComponent } from '../list/employer.component';
import { EmployerDetailComponent } from '../detail/employer-detail.component';
import { EmployerUpdateComponent } from '../update/employer-update.component';
import { EmployerRoutingResolveService } from './employer-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";
import {
  AuthorityUserPermissions,
  AuthorityUserRoles,
} from "../../enumerations/authority-type.model";

const employerRoute: Routes = [
  {
    path: '',
    component: EmployerComponent,
    data: {
      authorities: {
        permissions: [AuthorityUserPermissions["employers.index"]], // only users with permission 'employers.index' is allowed.
      },
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployerDetailComponent,
    data: {
      authorities: {
        roles: [AuthorityUserRoles.admin], // only admins allowed to view an employer.
      },
    },
    resolve: {
      employer: EmployerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployerUpdateComponent,
    data: {
      authorities: {
        roles: [AuthorityUserRoles.admin], // only admins allowed to create a new employer.
      },
    },
    resolve: {
      employer: EmployerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployerUpdateComponent,
    data: {
      authorities: {
        roles: [AuthorityUserRoles.admin], // only admins allowed to edit an employer.
      },
    },
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
