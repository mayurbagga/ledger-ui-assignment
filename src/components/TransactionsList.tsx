import React from 'react';
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
import { TransactionRow } from './TransactionRow';
import { Transaction } from '@/types/api';
    

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

export function TransactionsList() {
  const { data: transactions, isLoading, error } = useGetTransactions();

  console.log('TransactionsList - data:', transactions);
  console.log('TransactionsList - data type:', typeof transactions);
  console.log('TransactionsList - isArray:', Array.isArray(transactions));
  console.log('TransactionsList - isLoading:', isLoading);
  console.log('TransactionsList - error:', error);

  // Use fallback data if there's an error, no data, or empty array
  const transactionArray = (error || !transactions || !Array.isArray(transactions) || transactions.length === 0) 
    ? fallbackTransactions 
    : transactions;
  
  const handleDeleteTransaction = (id: string) => {
    console.log('Delete transaction:', id);
    // TODO: Implement delete functionality with SWR mutation
  };

  if (transactionArray.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className="space-y-4">
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