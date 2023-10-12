import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    TableModule,
    InputTextModule,
    DynamicDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    TableModule,
    InputTextModule,
    DynamicDialogModule,
  ],
  providers: [DialogService, DatePipe]
})
export class SharedModule { }
