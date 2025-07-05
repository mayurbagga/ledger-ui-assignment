import { Transaction, AccountBalance } from '@/types/api';

export const calculateAccountBalances = (transactions: Transaction[]): AccountBalance[] => {
  if (!Array.isArray(transactions)) {
    console.error('calculateAccountBalances - transactions is not an array::::', transactions);
    return [];
  }
  
  const balances: Record<string, number> = {};

  transactions.forEach(transaction => {
    const debitAccount = transaction.debitAccount || '';
    const creditAccount = transaction.creditAccount || '';
    const amount = transaction.amount || 0;
    
    // Debit increases the account balance
    if (!balances[debitAccount]) {
      balances[debitAccount] = 0;
    }
    balances[debitAccount] += amount;

    // Credit decreases the account balance
    if (!balances[creditAccount]) {
      balances[creditAccount] = 0;
    }
    balances[creditAccount] -= amount;
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