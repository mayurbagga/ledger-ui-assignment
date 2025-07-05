import { useMemo } from 'react';
import { useGetTransactions, GetTransactionsQueryError } from '@/api/generated/ledgerAPI';
import { calculateAccountBalances } from '@/utils/accounting';
import { AccountBalance } from '@/types/api';

// Fallback data to show immediately
const fallbackTransactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial balance',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 1000,
  },
  {
    id: '2',
    date: '2024-01-02',
    description: 'Office supplies',
    debitAccount: 'Office Expenses',
    creditAccount: 'Cash',
    amount: 150,
  },
  {
    id: '3',
    date: '2024-01-03',
    description: 'Client payment',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 500,
  },
];

export function useAccountBalances(): {
  balances: AccountBalance[];
  isLoading: boolean;
  error: GetTransactionsQueryError;
} {
  const { data: transactions, error, isLoading } = useGetTransactions();

  const balances = useMemo(() => {
    // Use fallback data if no data yet, or actual data if available
    const transactionData = Array.isArray(transactions) ? transactions : fallbackTransactions;
    
    if (!transactionData || transactionData.length === 0) {
      return [];
    }
    
    return calculateAccountBalances(transactionData);
  }, [transactions]);

  return {
    balances,
    isLoading,
    error,
  };
} 