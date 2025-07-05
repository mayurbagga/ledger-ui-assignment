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
  
  if (transactionArray.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>
      <ul className="space-y-2">
        {transactionArray.map((txn: Transaction) => (
          <li key={txn.id} className="p-3 border rounded-lg bg-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className="text-sm text-muted-foreground">{txn.date}</p>
                <p className="text-sm">
                  {txn.debitAccount} → {txn.creditAccount}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold">${txn.amount.toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}