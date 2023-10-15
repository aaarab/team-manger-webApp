import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import { HOME_ROUTE } from "./home.route";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild([HOME_ROUTE]),
    CommonModule
  ]
})
export class HomeModule { }
