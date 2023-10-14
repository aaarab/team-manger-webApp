
import { IAccount } from './account.model';

export const sampleWithRequiredData: IAccount = {
  id: 68352,
  name: 'compress withdrawal Cheese',
  email: 'demo@email.com',
};

export const sampleWithPartialData: Partial<IAccount> = {
  id: 18732,
  name: 'Games scalable',
};

export const sampleWithFullData: IAccount = {
  id: 32641,
  name: 'GB c Account',
  email: 'demo@email.com',
};

export const sampleWithNewData: IAccount   = {
  id: 12831,
  name: 'Picardie object-oriented',
  email: 'jad@conact.com',
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
