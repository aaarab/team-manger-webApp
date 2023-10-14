import { NgModule } from '@angular/core';
import { AccountUpdateComponent } from "./update/account-update.component";
import { AccountDetailComponent } from "./detail/account-detail.component";
import { AccountListComponent } from "./list/account-list.component";
import { AccountRoutingModule } from "./route/account-routing.module";
import { TabViewModule } from 'primeng/tabview';
import {DatePipe} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {MessageModule} from "primeng/message";

@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule,
    TabViewModule,
    DatePipe,
    MessageModule,
  ],
    declarations: [
      AccountListComponent,
      AccountUpdateComponent,
      AccountListComponent,
      AccountDetailComponent,
    ],
})
export class AccountModule { }
