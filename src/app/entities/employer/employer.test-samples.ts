import {IEmployer, NewEmployer} from './employer.model';
import {EmployerStatus} from "../enumerations/employer-status.model";

export const sampleWithRequiredData: IEmployer = {
  id: 15157,
  name: 'Island',
  email: 'Garett17@gmail.com',
  status:  EmployerStatus.draft,
};

export const sampleWithPartialData: IEmployer = {
  id: 80166,
  name: 'connecting Beauty',
  email: 'Madie90@yahoo.com',
  account_id: 13959,
  status: EmployerStatus.draft,
};

export const sampleWithFullData: IEmployer = {
  id: 39565,
  name: 'FTP Dynamic',
  email: 'Kayli_Russel21@hotmail.com',
  account_id: 38179,
  status: EmployerStatus['valid'],
};

export const sampleWithNewData: NewEmployer = {
  name: 'program',
  email: 'Shanny_Lebsack20@yahoo.com',
  account_id: 54051,
  status: EmployerStatus['cancelled'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
