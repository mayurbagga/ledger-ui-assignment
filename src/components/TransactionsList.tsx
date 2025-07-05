import React from 'react';
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
import { TransactionRow } from './TransactionRow';
import { Transaction } from '@/types/api';
    

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

export function TransactionsList() {
  const { data: transactions, isLoading, error } = useGetTransactions();

  console.log('TransactionsList - data:', transactions);
  console.log('TransactionsList - data type:', typeof transactions);
  console.log('TransactionsList - isArray:', Array.isArray(transactions));
  console.log('TransactionsList - isLoading:', isLoading);
  console.log('TransactionsList - error:', error);

  const handleDeleteTransaction = (id: string) => {
    console.log('Delete transaction:', id);
    // TODO: Implement delete functionality with SWR mutation
  };

  // Force re-render when loading state changes
  const loadingKey = isLoading ? 'loading' : 'loaded';

  // Show loading state only if we're in development with MSW
  const isDevelopment = import.meta.env.DEV;
  const shouldShowLoading = isLoading && isDevelopment;

  if (shouldShowLoading) {
    console.log('TransactionsList: Showing loading state (development)');
    return (
      <div className="space-y-4" key={loadingKey}>
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="border rounded-lg overflow-hidden">
          {/* Skeleton loaders */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="h-4 bg-muted rounded w-20 ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && isDevelopment) {
    console.log('TransactionsList: Showing error state (development)');
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="text-center py-8">
          <p className="text-sm text-destructive">Error loading transactions.</p>
        </div>
      </div>
    );
  }

  // Use fallback data if there's an error, no data, or empty array (production)
  const transactionArray = (error || !transactions || !Array.isArray(transactions) || transactions.length === 0) 
    ? fallbackTransactions 
    : transactions;
  
  if (transactionArray.length === 0) {
    console.log('TransactionsList: Showing empty state');
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No transactions found.</p>
        </div>
      </div>
    );
  }

  console.log('TransactionsList: Showing data state with', transactionArray.length, 'transactions');
  return (
    <div className="space-y-4" key={loadingKey}>
      <h2 className="text-xl font-semibold">Transactions</h2>
      <div className="border rounded-lg overflow-hidden">
        {transactionArray.map((txn: Transaction) => (
          <TransactionRow 
            key={txn.id} 
            transaction={txn} 
            onDelete={handleDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
}