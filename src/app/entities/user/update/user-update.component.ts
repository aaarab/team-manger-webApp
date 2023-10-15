import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserFormService, UserFormGroup } from './user-form.service';
import { IUser } from '../user.model';
import { UserService } from '../service/user.service';
import {MessageService} from "primeng/api";
import {Validators} from "@angular/forms";
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  isSaving = false;
  editForm: UserFormGroup = this.userFormService.createUserFormGroup();

  @Input()
  user!: IUser;

  constructor(
    protected userService: UserService,
    protected userFormService: UserFormService,
    protected activatedRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected accountService: AccountService,
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.updateForm(this.user);
      this.editForm.controls.password.addValidators(Validators.required);

    } else {
      this.activatedRoute.data.subscribe(({ user }) => {
        this.updateForm(user);
        this.editForm.controls.password.disable({ onlySelf: true, emitEvent: false });
      });
    }
  }

  get embedded(): boolean {
    return !!this.user;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    if (this.editForm.valid) {
      this.isSaving = true;
      const user = this.editForm.value;
      if (user.id) {
        this.embedded
          ? this.subscribeToSaveResponse(this.userService.updateProfile(user as IUser))
          : this.subscribeToSaveResponse(this.userService.update(user as IUser))
        ;
      } else {
        // since we always create admin users only.
        const copy = { ...user, roles: 'admin' } as unknown;
        this.subscribeToSaveResponse(this.userService.create(copy as IUser));
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res) => this.onSaveSuccess(res.body!),
      error: (error: HttpErrorResponse) => this.onSaveError(error.message),
    });
  }

  protected onSaveSuccess(res: IUser): void {
    let summary: string;

    if (this.editForm.value.id) {
      summary = this.embedded ? 'Profile Updated' : `A User is updated with identifier ${res.id}`;
      this.refreshAuthenticatedUser();
    } else {
      summary = `A new User is created with identifier ${res.id}`
    }

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

  protected updateForm(user: IUser): void {
    this.userFormService.resetForm(this.editForm, user, { onlySelf: true, emitEvent: false });
  }

  protected refreshAuthenticatedUser(): void {
    this.accountService.identity(true).subscribe();
  }
}
