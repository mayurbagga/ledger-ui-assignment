import { Transaction, AccountBalance } from '@/types/api';
import { format } from 'timeago.js';

export const calculateAccountBalances = (transactions: Transaction[]): AccountBalance[] => {
  if (!Array.isArray(transactions)) {
    console.error('calculateAccountBalances - transactions is not an array:', transactions);
    return [];
  }
  
  const balances: Record<string, number> = {};

  transactions.forEach(transaction => {
    // Debit increases the account balance
    if (!balances[transaction.debitAccount]) {
      balances[transaction.debitAccount] = 0;
    }
    balances[transaction.debitAccount] += transaction.amount;

    // Credit decreases the account balance
    if (!balances[transaction.creditAccount]) {
      balances[transaction.creditAccount] = 0;
    }
    balances[transaction.creditAccount] -= transaction.amount;
  });

  return Object.entries(balances)
    .map(([account, balance]) => ({ account, balance }))
    .sort((a, b) => a.account.localeCompare(b.account));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatRelativeTime = (dateString: string): string => {
  return format(dateString);
}; 