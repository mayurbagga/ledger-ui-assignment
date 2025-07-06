import { useState, useMemo, useCallback } from 'react';
import { Transaction } from '@/types/api';

export interface TransactionFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
  debitAccount: string;
  creditAccount: string;
  amountMin: string;
  amountMax: string;
  sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'description-asc' | 'description-desc';
}

const defaultFilters: TransactionFilters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  debitAccount: 'all',
  creditAccount: 'all',
  amountMin: '',
  amountMax: '',
  sortBy: 'date-desc',
};

export const useTransactionFilters = (transactions: Transaction[] = []) => {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);


  // Filter and sort transactions based on current filters
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      // Search filter
      if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Date range filters
      if (filters.dateFrom && transaction.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && transaction.date > filters.dateTo) {
        return false;
      }

      // Account filters
      if (filters.debitAccount && filters.debitAccount !== 'all' && transaction.debitAccount !== filters.debitAccount) {
        return false;
      }
      if (filters.creditAccount && filters.creditAccount !== 'all' && transaction.creditAccount !== filters.creditAccount) {
        return false;
      }

      // Amount range filters
      if (filters.amountMin && transaction.amount < parseFloat(filters.amountMin)) {
        return false;
      }
      if (filters.amountMax && transaction.amount > parseFloat(filters.amountMax)) {
        return false;
      }

      return true;
    });

    // Sort transactions
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'description-asc':
          return a.description.localeCompare(b.description);
        case 'description-desc':
          return b.description.localeCompare(a.description);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime(); // Default to latest first
      }
    });
  }, [transactions, filters]);

  // Calculate pagination
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFiltersChange = useCallback((newFilters: TransactionFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  return {
    filters,
    filteredTransactions: paginatedTransactions,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    handleFiltersChange,
    handleClearFilters,
    handlePageChange,
    handlePageSizeChange,
  };
}; 