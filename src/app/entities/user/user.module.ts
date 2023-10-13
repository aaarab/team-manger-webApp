import { NgModule } from '@angular/core';
import { UserComponent } from './list/user.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserUpdateComponent } from './update/user-update.component';
import { UserRoutingModule } from './route/user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from "../../shared/shared.module";
import { PasswordStrengthBarComponent } from "../../auth/password-strength-bar/password-strength-bar.component";
import {AvatarModule} from "primeng/avatar";
import {MessageModule} from "primeng/message";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    PasswordStrengthBarComponent,
    AvatarModule,
    MessageModule,
    CalendarModule
  ],
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserUpdateComponent,
    ProfileComponent,
  ],
})
export class UserModule {}
