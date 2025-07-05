import { useMemo } from 'react';
import { useGetTransactions, GetTransactionsQueryError } from '@/api/generated/ledgerAPI';
import { calculateAccountBalances } from '@/utils/accounting';
import { AccountBalance } from '@/types/api';

export function useAccountBalances(): {
  balances: AccountBalance[];
  isLoading: boolean;
  error: GetTransactionsQueryError | undefined;
} {
  const { data: transactions, error, isLoading } = useGetTransactions();

  const balances = useMemo(() => {
    if (!transactions) return [];
    if (!Array.isArray(transactions)) {
      console.error('Transactions is not an array:', transactions);
      return [];
    }
    return calculateAccountBalances(transactions);
  }, [transactions]);

  return {
    balances,
    isLoading,
    error,
  };
} 