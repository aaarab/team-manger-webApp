import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {errorRoute} from "./layouts/error/error.route";


@NgModule({
  imports: [RouterModule.forRoot([
    ...errorRoute,
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
