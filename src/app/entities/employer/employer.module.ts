import { NgModule } from '@angular/core';
import { EmployerComponent } from './list/employer.component';
import { EmployerDetailComponent } from './detail/employer-detail.component';
import { EmployerUpdateComponent } from './update/employer-update.component';
import { EmployerRoutingModule } from './route/employer-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {MessageModule} from "primeng/message";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  imports: [SharedModule, EmployerRoutingModule, MessageModule, DropdownModule],
  declarations: [EmployerComponent, EmployerDetailComponent, EmployerUpdateComponent],
})
export class EmployerModule {}
