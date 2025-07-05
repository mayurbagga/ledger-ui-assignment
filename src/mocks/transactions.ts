// src/mocks/transactions.ts

export const sampleTransactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial balance',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 1000,
  },
 
];

// Generates a new transaction with a unique ID and allows overrides
export function generateRealisticTransaction(override = {}) {
  return {
    id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString().slice(0, 10),
    description: 'New transaction',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 100,
    ...override,
  };
} 