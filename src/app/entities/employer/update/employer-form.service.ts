import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {IEmployer, NewEmployer} from '../employer.model';
import {EmployerStatus} from "../../enumerations/employer-status.model";

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployer for edit and NewEmployerFormGroupInput for create.
 */
type EmployerFormGroupInput = IEmployer | PartialWithRequiredKeyOf<NewEmployer>;

type EmployerFormDefaults = Pick<NewEmployer, 'status'>;

type EmployerFormGroupContent = {
  id: FormControl<IEmployer['id'] | NewEmployer['id']>;
  name: FormControl<IEmployer['name']>;
  email: FormControl<IEmployer['email']>;
  account_id: FormControl<IEmployer['account_id']>;
  status: FormControl<IEmployer['status']>;
};

export type EmployerFormGroup = FormGroup<EmployerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployerFormService {
  createEmployerFormGroup(employer: EmployerFormGroupInput = { id: null }): EmployerFormGroup {
    const employerRawValue = {
      ...this.getFormDefaults(),
      ...employer,
    };
    return new FormGroup<EmployerFormGroupContent>({
      id: new FormControl(employerRawValue.id),
      name: new FormControl(employerRawValue.name, {
        validators: [Validators.required],
      }),
      email: new FormControl(employerRawValue.email, {
        validators: [Validators.required],
      }),
      account_id: new FormControl(employerRawValue.account_id, {
        validators: [Validators.required],
      }),
      status: new FormControl(employerRawValue.status, {
        validators: [Validators.required],
      }),
    });
  }

  getEmployer(form: EmployerFormGroup): IEmployer | NewEmployer {
    return form.getRawValue() as IEmployer | NewEmployer;
  }

  resetForm(
    form: EmployerFormGroup,
    employer: IEmployer,
    options?: {
      emmitEvent: boolean,
      onlySelf: boolean
    }
  ): void {
    const employerRawValue = { ...this.getFormDefaults(), ...employer };
    form.reset(employerRawValue, options);
  }

  private getFormDefaults(): EmployerFormDefaults {
    return {
      status: EmployerStatus.draft,
    };
  }
}
