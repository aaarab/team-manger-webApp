import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../list/user.component';
import { UserDetailComponent } from '../detail/user-detail.component';
import { UserUpdateComponent } from '../update/user-update.component';
import { UserRoutingResolveService } from './user-routing-resolve.service';
import {ProfileComponent} from "../profile/profile.component";
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";
import {AuthorityUserRoles} from "../../enumerations/authority-type.model";

const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      pageTitle: 'Users',
      authorities: {
        roles: [AuthorityUserRoles.admin] //only admins allowed to view all users.
      }
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserDetailComponent,
    data: {
      pageTitle: 'Users',
      authorities: {
        roles: [AuthorityUserRoles.admin] //only admins allowed view users.
      }
    },
    resolve: {
      user: UserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserUpdateComponent,
    data: {
      pageTitle: 'Users',
      authorities: {
        roles: [AuthorityUserRoles.admin] //only admins allowed to create a new user.
      }
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent,
    data: {
      pageTitle: 'Users',
      authorities: {
        roles: [AuthorityUserRoles.admin] //only admins allowed to edit a user.
      }
    },
    resolve: {
      user: UserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { pageTitle: 'profile' },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
