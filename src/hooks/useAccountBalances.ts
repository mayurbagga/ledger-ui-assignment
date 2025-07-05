import { useMemo } from 'react';
import { useGetTransactions, GetTransactionsQueryError } from '@/api/generated/ledgerAPI';
import { calculateAccountBalances } from '@/utils/accounting';
import { AccountBalance } from '@/types/api';

// Fallback data for production (Vercel) when MSW is not available
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
    description: 'Office supplies purchase',
    debitAccount: 'Office Expenses',
    creditAccount: 'Cash',
    amount: 150,
  },
  {
    id: '3',
    date: '2024-01-03',
    description: 'Client payment for consulting services',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 500,
  },
  {
    id: '4',
    date: '2024-01-04',
    description: 'Rent payment',
    debitAccount: 'Rent Expense',
    creditAccount: 'Cash',
    amount: 800,
  },
  {
    id: '5',
    date: '2024-01-05',
    description: 'Equipment purchase',
    debitAccount: 'Equipment',
    creditAccount: 'Cash',
    amount: 1200,
  },
];

export function useAccountBalances(): {
  balances: AccountBalance[];
  isLoading: boolean;
  error: GetTransactionsQueryError;
} {
  const { data: transactions, error, isLoading } = useGetTransactions();

  const balances = useMemo(() => {
    // Use fallback data if there's an error, no data, or empty array (production)
    const transactionData = (error || !transactions || !Array.isArray(transactions) || transactions.length === 0)
      ? fallbackTransactions
      : transactions;
    
    if (!transactionData || transactionData.length === 0) {
      return [];
    }
    
    return calculateAccountBalances(transactionData);
  }, [transactions, error]);

  return {
    balances,
    isLoading,
    error,
  };
} 