
export interface IUser {
  id: number;
  name: string | null;
  email: string | null;
  password?: string | null;
  address?: string | null;
  phone?: string | null;
  birthday?: Date | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

