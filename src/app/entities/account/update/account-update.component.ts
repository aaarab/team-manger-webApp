import {Component, OnInit} from '@angular/core';
import {AccountFormGroup, AccountFormService} from "./account-form.service";
import {AccountService} from "../service/account.service";
import { finalize, Observable } from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IAccount} from "../account.model";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  isSaving = false;
  editForm: AccountFormGroup = this.accountFormService.createAccountForm();

  constructor(
    protected activateRoute: ActivatedRoute,
    protected accountFormService: AccountFormService,
    protected accountService: AccountService,
    protected messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.data.subscribe(({ account }) => {
      this.updateForm(account);
    });


  }


  save(): void {
    if (this.editForm.valid) {
      this.isSaving = true;
      const account = this.accountFormService.getAccount(this.editForm);
      if (account.id) {
        this.subscribeToSaveResponse(this.accountService.update(account as IAccount));
      } else {
        this.subscribeToSaveResponse(this.accountService.create(account as IAccount));
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  previousState(): void {
    window.history.back();
  }



  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      (res) => this.onSaveSuccess(res.body!),
      (error: HttpErrorResponse) => this.onSaveError(error.message)
    );
  }

  protected onSaveSuccess(account: IAccount): void {
    const summary = this.editForm.value.id
      ? `A Account is updated with identifier ${account.id}`
      : `A new Account is created with identifier ${account.id}`

    this.messageService.add({
      severity: 'success',
      summary
    });
    this.previousState();
  }

  protected onSaveError(error: string): void {
    this.isSaving = false;
    this.messageService.add({
      severity: 'error',
      summary: error
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  private updateForm(account: IAccount | null): void {
    if (account) {
      this.accountFormService.resetForm(this.editForm, { ...account }, { onlySelf: true, emitEvent: false});
    } else {
      this.accountFormService.resetForm(this.editForm);
    }
  }

}
