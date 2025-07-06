import { useState, useMemo, useCallback } from 'react';
import { AccountBalance } from '@/types/api';
import { ACCOUNT_TYPE_MAP } from '@/constants/accounts';

export interface AccountBalanceFilters {
  search: string;
  accountType: string;
  balanceMin: string;
  balanceMax: string;
  sortBy: 'account-asc' | 'account-desc' | 'balance-asc' | 'balance-desc';
}

const defaultFilters: AccountBalanceFilters = {
  search: '',
  accountType: 'all',
  balanceMin: '',
  balanceMax: '',
  sortBy: 'account-asc',
};

export const useAccountBalanceFilters = (balances: AccountBalance[] = []) => {
  const [filters, setFilters] = useState<AccountBalanceFilters>(defaultFilters);

  // Filter and sort account balances based on current filters
  const filteredBalances = useMemo(() => {
    console.log('Filtering balances with:', filters);
    console.log('Total balances to filter:', balances.length);
    
    const filtered = balances.filter((balance) => {
      // Search filter
      if (filters.search && !balance.account.toLowerCase().includes(filters.search.toLowerCase())) {
        console.log('Filtered out by search:', balance.account);
        return false;
      }

      // Account type filter
      if (filters.accountType && filters.accountType !== 'all') {
        const accountType = ACCOUNT_TYPE_MAP[balance.account];
        if (accountType !== filters.accountType) {
          console.log('Filtered out by account type:', balance.account, accountType, filters.accountType);
          return false;
        }
      }

      // Balance range filters
      if (filters.balanceMin && balance.balance < parseFloat(filters.balanceMin)) {
        console.log('Filtered out by min balance:', balance.account, balance.balance, filters.balanceMin);
        return false;
      }
      if (filters.balanceMax && balance.balance > parseFloat(filters.balanceMax)) {
        console.log('Filtered out by max balance:', balance.account, balance.balance, filters.balanceMax);
        return false;
      }

      return true;
    });
    
    console.log('Filtered results:', filtered.length);

    // Sort account balances
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'account-asc':
          return a.account.localeCompare(b.account);
        case 'account-desc':
          return b.account.localeCompare(a.account);
        case 'balance-asc':
          return a.balance - b.balance;
        case 'balance-desc':
          return b.balance - a.balance;
        default:
          return a.account.localeCompare(b.account);
      }
    });
  }, [balances, filters]);

  const handleFiltersChange = useCallback((newFilters: AccountBalanceFilters) => {
    console.log('Filter hook received:', newFilters);
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    filteredBalances,
    handleFiltersChange,
    handleClearFilters,
  };
}; 