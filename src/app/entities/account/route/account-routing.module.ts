import { NgModule } from '@angular/core';
import { AccountUpdateComponent } from "../update/account-update.component";
import { AccountRoutingResolveService } from "./account.resolver";
import { AccountDetailComponent } from "../detail/account-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {AccountListComponent} from "../list/account-list.component";
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const accountRoute: Routes = [
  {
    path: '',
    component: AccountListComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountDetailComponent,
    resolve: {
      account: AccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountUpdateComponent,
    resolve: {
      account: AccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountUpdateComponent,
    resolve: {
      account: AccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRoute)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
