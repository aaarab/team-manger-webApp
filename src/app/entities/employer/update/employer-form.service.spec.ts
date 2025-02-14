import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employer.test-samples';

import { EmployerFormService } from './employer-form.service';

describe('Employer Form Service', () => {
  let service: EmployerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerFormService);
  });

  describe('Service methods', () => {
    describe('createEmployerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            account_id: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing IEmployer should create a new form with FormGroup', () => {
        const formGroup = service.createEmployerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            account_id: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployer', () => {
      it('should return NewEmployer for default Employer initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmployerFormGroup(sampleWithNewData);

        const employer = service.getEmployer(formGroup) as any;

        expect(employer).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployer for empty Employer initial value', () => {
        const formGroup = service.createEmployerFormGroup();

        const employer = service.getEmployer(formGroup) as any;

        expect(employer).toMatchObject({});
      });

      it('should return IEmployer', () => {
        const formGroup = service.createEmployerFormGroup(sampleWithRequiredData);

        const employer = service.getEmployer(formGroup) as any;

        expect(employer).toMatchObject(sampleWithRequiredData);
      });
    });

  });
});
