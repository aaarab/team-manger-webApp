import {EmployerStatus} from "../enumerations/employer-status.model";

export interface IEmployer {
  id: number;
  name?: string | null;
  email?: string | null;
  account_id?: number | null;
  status?: EmployerStatus | null;
}

export type NewEmployer = Omit<IEmployer, 'id'> & { id: null };
