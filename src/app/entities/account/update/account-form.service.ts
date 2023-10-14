import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '../account.model';

export type AccountFormGroupContent = {
  id: FormControl<IAccount['id'] | null | undefined>;
  name: FormControl<IAccount['name'] | null | undefined>;
  email: FormControl<IAccount['email'] | null | undefined>;
  created_at?: FormControl<IAccount['created_at'] | null | undefined>;
  updated_at?: FormControl<IAccount['updated_at'] | null | undefined>;
};

export type AccountFormGroup = FormGroup<AccountFormGroupContent>;

@Injectable({
  providedIn: 'root',
})
export class AccountFormService {
  createAccountForm(account: Partial<IAccount> = {}): AccountFormGroup {
    const accountRowValue = { ...this.getFormDefaults(), ...account };

    return new FormGroup<AccountFormGroupContent>({
      id: new FormControl(accountRowValue.id),
      name: new FormControl(accountRowValue.name),
      email: new FormControl(accountRowValue.email, { validators: [Validators.required, Validators.email] }),
    });
  }

  getAccount(form: AccountFormGroup): IAccount {
    return form.getRawValue() as IAccount;
  }

  resetForm(
    form: AccountFormGroup,
    account: Partial<IAccount> = {},
    options?: {
      onlySelf: boolean,
      emitEvent: boolean,
    }
  ): void {
    form.reset({ ...this.getFormDefaults(), ...account }, options);
  }

  private getFormDefaults(): Partial<IAccount> {
    return {};
  }
}
