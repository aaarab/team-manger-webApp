import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EmployerFormService, EmployerFormGroup } from './employer-form.service';
import {IEmployer, NewEmployer} from '../employer.model';
import { EmployerService } from '../service/employer.service';
import {EmployerStatus} from "../../enumerations/employer-status.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-employer-update',
  templateUrl: './employer-update.component.html',
})
export class EmployerUpdateComponent implements OnInit {
  isSaving = false;
  employerStatusOptions = Object.entries(EmployerStatus).map(([k]) => ({ label: k, value: k }));
  accountOptions: any;
  // TODO to fix in account branch.
  // accountOptions!: IAccount[];

  editForm: EmployerFormGroup = this.employerFormService.createEmployerFormGroup();

  constructor(
    protected employerService: EmployerService,
    protected employerFormService: EmployerFormService,
    protected activatedRoute: ActivatedRoute,
    protected messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employer }) => {
      if (employer) {
        this.updateForm(employer);
      }
    });

    this.loadAllAccounts();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    if (this.editForm.valid) {
      this.isSaving = true;
      const employer = this.employerFormService.getEmployer(this.editForm);
      if (this.editForm.value.id) {
        this.subscribeToSaveResponse(this.employerService.update(employer as IEmployer));
      } else {
        this.subscribeToSaveResponse(this.employerService.create(employer as NewEmployer));
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  loadAllAccounts(): void {
    // TODO make account service query.
    // Account branch.
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployer>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res) => this.onSaveSuccess(res.body!),
      error: (error: HttpErrorResponse) => this.onSaveError(error.message),
    });
  }

  protected onSaveSuccess(res: IEmployer): void {

    const summary =  this.editForm.value.id
      ? `A Employer is updated with identifier ${res.id}`
      : `A new Employer is created with identifier ${res.id}`

    this.messageService.add({
      severity: 'success',
      summary
    });

    this.previousState();
  }

  protected onSaveError(error: string): void {
    this.messageService.add({
      severity: 'error',
      summary: error,
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employer: IEmployer): void {
    if (employer) {
      this.employerFormService.resetForm(this.editForm, employer, { emmitEvent: false, onlySelf: true });
    } else {
      this.employerFormService.resetForm(this.editForm, employer);
    }
  }
}
