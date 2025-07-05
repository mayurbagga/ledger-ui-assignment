import { Transaction } from '@/api/generated/model';

export interface AccountBalance {
  account: string;
  balance: number;
}

export type { Transaction }; 