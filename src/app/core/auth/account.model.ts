
export interface IRole {
  id: number;
  name: string;
  guard_name: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export class Account {
  constructor(
    public id: number,
    public name: string,
    public email?: string | null,
    public password?: string | null,
    public address?: string | null,
    public phone?: string | null,
    public birthday?: Date | null,
    public created_by?: number | null,
    public created_at?: Date | null,
    public updated_by?: number | null,
    public updated_at?: Date | null,
    public roles?: IRole[],
    public permissions?: string[],
  ) {}
}
