import { useMemo } from 'react';
import { useGetTransactions, GetTransactionsQueryError } from '@/api/generated/ledgerAPI';
import { calculateAccountBalances } from '@/utils/accounting';
import { AccountBalance } from '@/types/api';

// Fallback data that shows immediately
const fallbackTransactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial investment',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 10000,
  },
  {
    id: '2',
    date: '2024-01-02',
    description: 'Purchase office supplies',
    debitAccount: 'Office Supplies',
    creditAccount: 'Cash',
    amount: 500,
  },
  {
    id: '3',
    date: '2024-01-03',
    description: 'Client payment received',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 2500,
  },
];

export function useAccountBalances(): {
  balances: AccountBalance[];
  isLoading: boolean;
  error: GetTransactionsQueryError;
} {
  const { data: transactions, error } = useGetTransactions();

  const balances = useMemo(() => {
    // Use fallback data if no data yet (MSW startup)
    const transactionData = Array.isArray(transactions) ? transactions : fallbackTransactions;
    
    if (!transactionData) return [];
    if (!Array.isArray(transactionData)) {
      console.error('Transactions is not an array:', transactionData);
      return [];
    }
    return calculateAccountBalances(transactionData);
  }, [transactions]);

  return {
    balances,
    isLoading: false, // Always show data immediately
    error,
  };
} 