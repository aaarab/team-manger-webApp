import {Component, Input, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserFormService, UserFormGroup } from './user-form.service';
import { IUser } from '../user.model';
import { UserService } from '../service/user.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  isSaving = false;
  embedded!: boolean;
  editForm: UserFormGroup = this.userFormService.createUserFormGroup();

  @Input()
  user!: IUser;

  constructor(
    protected userService: UserService,
    protected userFormService: UserFormService,
    protected activatedRoute: ActivatedRoute,
    protected messageService: MessageService,
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.embedded = true;
      this.updateForm(this.user);
    } else {
      this.activatedRoute.data.subscribe(({ user }) => {
        this.updateForm(user);
        this.editForm.controls.password.disabled;
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    if (this.editForm.valid) {
      this.isSaving = true;
      const user = this.editForm.value;
      if (!this.embedded) {
        delete user.password;
      }
      if (user.id) {
        this.subscribeToSaveResponse(this.userService.update(user as IUser));
      } else {
        this.subscribeToSaveResponse(this.userService.create(user as IUser));
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res) => this.onSaveSuccess(res.body!),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(res: IUser): void {
    const summary =  this.editForm.value.id
      ? `A User is updated with identifier ${res.id}`
      : `A new User is created with identifier ${res.id}`

    this.messageService.add({
      severity: 'success',
      summary
    });

    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(user: IUser): void {
    this.userFormService.resetForm(this.editForm, user, { onlySelf: true, emitEvent: false });
  }
}
