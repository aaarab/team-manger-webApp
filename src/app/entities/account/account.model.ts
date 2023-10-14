
export interface IAccount {
  id: number;
  name: string | null;
  email: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  employers_count?: number | null;
}


export function getAccountIdentifier(account: IAccount): number {
  return account.id;
}
