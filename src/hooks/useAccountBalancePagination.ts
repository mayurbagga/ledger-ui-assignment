import { useState, useCallback } from 'react';
import { AccountBalance } from '@/types/api';

export const useAccountBalancePagination = (balances: AccountBalance[] = []) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Show 5 accounts per page by default

  // Calculate pagination
  const totalItems = balances.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBalances = balances.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  return {
    paginatedBalances,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
}; 