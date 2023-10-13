import { EmployerStatus } from 'app/entities/enumerations/employer-status.model';

import { IEmployer, NewEmployer } from './employer.model';

export const sampleWithRequiredData: IEmployer = {
  id: 15157,
  name: 'Island',
  email: 'Garett17@gmail.com',
  accountId: 75146,
  status: EmployerStatus['DRAFT'],
};

export const sampleWithPartialData: IEmployer = {
  id: 80166,
  name: 'connecting Beauty',
  email: 'Madie90@yahoo.com',
  accountId: 13959,
  status: EmployerStatus['VALID'],
};

export const sampleWithFullData: IEmployer = {
  id: 39565,
  name: 'FTP Dynamic',
  email: 'Kayli_Russel21@hotmail.com',
  accountId: 38179,
  status: EmployerStatus['VALID'],
};

export const sampleWithNewData: NewEmployer = {
  name: 'program',
  email: 'Shanny_Lebsack20@yahoo.com',
  accountId: 54051,
  status: EmployerStatus['CANCELLED'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
