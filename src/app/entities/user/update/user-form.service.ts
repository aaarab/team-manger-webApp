import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUser } from '../user.model';

type UserFormGroupContent = {
  id: FormControl<IUser['id'] | null | undefined>;
  name: FormControl<IUser['name'] | null | undefined>;
  email: FormControl<IUser['email'] | null | undefined>;
  password: FormControl<IUser['password']>;
  address: FormControl<IUser['address']>;
  birthday: FormControl<IUser['birthday']>;
  phone: FormControl<IUser['phone']>;
};

export type UserFormGroup = FormGroup<UserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserFormService {
  createUserFormGroup(user: Partial<IUser> = {}): UserFormGroup {
    const userRawValue = {
      ...this.getFormDefaults(),
      ...user,
    };
    return new FormGroup<UserFormGroupContent>({
      id: new FormControl(userRawValue.id),
      name: new FormControl(userRawValue.name, {
        validators: [Validators.required],
      }),
      email: new FormControl(userRawValue.email, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(userRawValue.password, {
        validators: [Validators.maxLength(60)],
      }),
      phone: new FormControl(userRawValue.phone),
      birthday: new FormControl(userRawValue.birthday),
      address: new FormControl(userRawValue.address),
    });
  }

  getUser(form: UserFormGroup): IUser {
    return form.getRawValue() as IUser;
  }

  resetForm(
    form: UserFormGroup,
    user: Partial<IUser> = {},
    options?: {
      onlySelf: boolean,
      emitEvent: boolean
    }
  ): void {
    const userRawValue = { ...this.getFormDefaults(), ...user };
    form.reset({...userRawValue}, options);
  }

  private getFormDefaults(): Partial<IUser> {
    return {};
  }
}
