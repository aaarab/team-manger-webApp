import { TestBed } from '@angular/core/testing';

import { AccountFormService } from './account-form.service';
import {sampleWithNewData, sampleWithRequiredData} from "../account.test-samples";

describe('AccountFormService', () => {
  let service: AccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountFormService);
  });

  describe('Service methods', () => {
    describe('createAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountForm();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });

      it('passing IEmployer should create a new form with FormGroup', () => {
        const formGroup = service.createAccountForm(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployer', () => {
      it('should return Account for default Account initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountForm(sampleWithNewData);

        const employer = service.getAccount(formGroup) as any;

        expect(employer).toMatchObject(sampleWithNewData);
      });

      it('should return Account for empty Account initial value', () => {
        const formGroup = service.createAccountForm();

        const employer = service.getAccount(formGroup) as any;

        expect(employer).toMatchObject({});
      });

      it('should return Account', () => {
        const formGroup = service.createAccountForm(sampleWithRequiredData);

        const employer = service.getAccount(formGroup) as any;

        expect(employer).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing Account should not enable id FormControl', () => {
        const formGroup = service.createAccountForm();
        expect(formGroup.controls.id.disabled).toBe(false);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(false);
      });
    });
  });
});
