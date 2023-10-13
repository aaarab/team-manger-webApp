import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usere.test-samples';

import { UserFormService } from './usere-form.service';

describe('Usere Form Service', () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormService);
  });

  describe('Service methods', () => {
    describe('createUsereFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsereFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            org: expect.any(Object),
            roleid: expect.any(Object),
            departmentid: expect.any(Object),
            supervisor: expect.any(Object),
            firstname: expect.any(Object),
            lastname: expect.any(Object),
            surname: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            g2faIsEnabled: expect.any(Object),
            g2faSecret: expect.any(Object),
            g2faVerifyAfter: expect.any(Object),
            g2faVerifiedAt: expect.any(Object),
            position: expect.any(Object),
            phone: expect.any(Object),
            mobile: expect.any(Object),
            avatar: expect.any(Object),
            signature: expect.any(Object),
            stamp: expect.any(Object),
            cin: expect.any(Object),
            address: expect.any(Object),
            zipcode: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
            hourlyRate: expect.any(Object),
            salary: expect.any(Object),
            commission: expect.any(Object),
            signupDate: expect.any(Object),
            lastlogin: expect.any(Object),
            expired: expect.any(Object),
            ping: expect.any(Object),
            isdefault: expect.any(Object),
            notifications: expect.any(Object),
            secret: expect.any(Object),
            status: expect.any(Object),
            created: expect.any(Object),
            updated: expect.any(Object),
          })
        );
      });

      it('passing IUsere should create a new form with FormGroup', () => {
        const formGroup = service.createUsereFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            org: expect.any(Object),
            roleid: expect.any(Object),
            departmentid: expect.any(Object),
            supervisor: expect.any(Object),
            firstname: expect.any(Object),
            lastname: expect.any(Object),
            surname: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            g2faIsEnabled: expect.any(Object),
            g2faSecret: expect.any(Object),
            g2faVerifyAfter: expect.any(Object),
            g2faVerifiedAt: expect.any(Object),
            position: expect.any(Object),
            phone: expect.any(Object),
            mobile: expect.any(Object),
            avatar: expect.any(Object),
            signature: expect.any(Object),
            stamp: expect.any(Object),
            cin: expect.any(Object),
            address: expect.any(Object),
            zipcode: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
            hourlyRate: expect.any(Object),
            salary: expect.any(Object),
            commission: expect.any(Object),
            signupDate: expect.any(Object),
            lastlogin: expect.any(Object),
            expired: expect.any(Object),
            ping: expect.any(Object),
            isdefault: expect.any(Object),
            notifications: expect.any(Object),
            secret: expect.any(Object),
            status: expect.any(Object),
            created: expect.any(Object),
            updated: expect.any(Object),
          })
        );
      });
    });

    describe('getUsere', () => {
      it('should return NewUsere for default Usere initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsereFormGroup(sampleWithNewData);

        const usere = service.getUsere(formGroup) as any;

        expect(usere).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsere for empty Usere initial value', () => {
        const formGroup = service.createUsereFormGroup();

        const usere = service.getUsere(formGroup) as any;

        expect(usere).toMatchObject({});
      });

      it('should return IUsere', () => {
        const formGroup = service.createUsereFormGroup(sampleWithRequiredData);

        const usere = service.getUsere(formGroup) as any;

        expect(usere).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsere should not enable id FormControl', () => {
        const formGroup = service.createUsereFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsere should disable id FormControl', () => {
        const formGroup = service.createUsereFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
