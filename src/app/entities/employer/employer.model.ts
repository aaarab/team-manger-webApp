import {EmployerStatus} from "../enumerations/employer-status.model";
import {IAccount} from "../account/account.model";

export interface IEmployer {
  id: number;
  name?: string | null;
  email?: string | null;
  account_id?: number | null;
  status?: EmployerStatus | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  account?: IAccount | null;
}

export type NewEmployer = Omit<IEmployer, 'id'> & { id: null };
