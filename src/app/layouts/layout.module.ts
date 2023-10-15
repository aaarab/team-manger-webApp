import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {SharedModule} from "../shared/shared.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {RouterOutlet} from "@angular/router";
import {MenubarModule} from "primeng/menubar";
import { TopbarComponent } from './components/topbar/topbar.component';
import {AclComponent} from "../components/acl/acl.component";



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    TopbarComponent
  ],
    imports: [
        SharedModule,
        RouterOutlet,
        MenubarModule,
        AclComponent,
    ],
  exports: [
    LayoutComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class LayoutModule { }
