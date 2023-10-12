import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layouts/layout.component';
import {LayoutModule} from "./layouts/layout.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {ErrorComponent} from "./layouts/error/error.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
  ],
  providers: [],
  declarations: [ErrorComponent],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
