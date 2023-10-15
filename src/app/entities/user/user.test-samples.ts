import {IUser} from "./user.model";

export const sampleWithRequiredData: IUser = {
  id: 15157,
  name: 'Island',
  email: 'Garett17@gmail.com',
};

export const sampleWithPartialData: IUser = {
  id: 80166,
  name: 'connecting Beauty',
  email: 'Madie90@yahoo.com',
  address: 'casablanca',
  birthday: null,
  phone: '+3623742834',
};

export const sampleWithFullData: IUser = {
  id: 39565,
  name: 'FTP Dynamic',
  email: 'Kayli_Russel21@hotmail.com',
  address: 'casablanca',
  birthday: null,
  phone: '+3623742834',
};

export const sampleWithNewData: IUser = {
  name: 'program',
  email: 'Shanny_Lebsack20@yahoo.com',
  address: 'casablanca',
  birthday: null,
  phone: '+3623742834',
  id: 12,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
