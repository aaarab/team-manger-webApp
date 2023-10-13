import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../list/user.component';
import { UserDetailComponent } from '../detail/user-detail.component';
import { UserUpdateComponent } from '../update/user-update.component';
import { UserRoutingResolveService } from './user-routing-resolve.service';
import {ProfileComponent} from "../profile/profile.component";
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserDetailComponent,
    resolve: {
      user: UserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserUpdateComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent,
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
