import React from 'react';
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
    

// Define the Transaction type
export type Transaction = {
  id: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
};

export function TransactionsList() {
  const { data: transactions, isLoading, error } = useGetTransactions();

  console.log('transactions:', transactions);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions.</div>;
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <ul>
      {transactions.map((txn: Transaction) => (
        <li key={txn.id}>
          {txn.date} | {txn.description} | {txn.debitAccount} → {txn.creditAccount} | ${txn.amount}
        </li>
      ))}
    </ul>
  );
}