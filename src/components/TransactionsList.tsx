import React, { useState } from 'react';
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
import { TransactionRow } from './TransactionRow';
import { FilterModal } from './FilterModal';
import { TransactionPagination } from './TransactionPagination';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { Transaction } from '@/types/api';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
    

// Fallback data for production (Vercel) when MSW is not available
const fallbackTransactions = [
  {
    id: '1',
    date: '2025-01-15T09:30:00Z',
    description: 'Initial investment',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 15000,
  },
  {
    id: '2',
    date: '2025-01-16T14:15:00Z',
    description: 'Equipment purchase - MacBook Pro',
    debitAccount: 'Equipment',
    creditAccount: 'Cash',
    amount: 2500,
  },
  {
    id: '3',
    date: '2025-01-17T11:45:00Z',
    description: 'Office supplies purchase',
    debitAccount: 'Office Supplies',
    creditAccount: 'Cash',
    amount: 350,
  },
  {
    id: '4',
    date: '2025-01-18T16:20:00Z',
    description: 'Consulting services provided - Q1 Project',
    debitAccount: 'Accounts Receivable',
    creditAccount: 'Revenue',
    amount: 5000,
  },
  {
    id: '5',
    date: '2025-01-19T10:30:00Z',
    description: 'Payment received for consulting',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 5000,
  },
  {
    id: '6',
    date: '2025-01-20T08:00:00Z',
    description: 'Rent payment - January 2025',
    debitAccount: 'Rent Expense',
    creditAccount: 'Cash',
    amount: 1200,
  },
  {
    id: '7',
    date: '2025-01-21T13:45:00Z',
    description: 'Utility bill payment - Electricity',
    debitAccount: 'Utilities',
    creditAccount: 'Cash',
    amount: 180,
  },
  {
    id: '8',
    date: '2025-01-22T15:30:00Z',
    description: 'Marketing expenses - Google Ads',
    debitAccount: 'Marketing',
    creditAccount: 'Cash',
    amount: 450,
  },
  {
    id: '9',
    date: '2025-01-23T12:00:00Z',
    description: 'Software subscription - Adobe Creative Suite',
    debitAccount: 'Software Licenses',
    creditAccount: 'Cash',
    amount: 52.99,
  },
  {
    id: '10',
    date: '2025-01-24T09:15:00Z',
    description: 'Client payment received - Website Design',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 3000,
  },
  {
    id: '11',
    date: '2025-01-25T14:30:00Z',
    description: 'Insurance premium - Business liability',
    debitAccount: 'Insurance',
    creditAccount: 'Cash',
    amount: 250,
  },
  {
    id: '12',
    date: '2025-01-26T11:20:00Z',
    description: 'Coffee and snacks for team meeting',
    debitAccount: 'Meals & Entertainment',
    creditAccount: 'Cash',
    amount: 85.50,
  },
  {
    id: '13',
    date: '2025-01-27T16:45:00Z',
    description: 'Freelance payment - Graphic design work',
    debitAccount: 'Contractor Expenses',
    creditAccount: 'Cash',
    amount: 750,
  },
  {
    id: '14',
    date: '2025-01-28T10:00:00Z',
    description: 'Domain registration renewal',
    debitAccount: 'Website Expenses',
    creditAccount: 'Cash',
    amount: 12.99,
  },
  {
    id: '15',
    date: '2025-01-29T13:15:00Z',
    description: 'Sales revenue - Product launch',
    debitAccount: 'Cash',
    creditAccount: 'Revenue',
    amount: 2500,
  },
  {
    id: '16',
    date: '2025-01-30T08:30:00Z',
    description: 'Bank fees - Monthly maintenance',
    debitAccount: 'Bank Fees',
    creditAccount: 'Cash',
    amount: 15.00,
  },
  {
    id: '17',
    date: '2025-01-31T15:45:00Z',
    description: 'Office cleaning service',
    debitAccount: 'Cleaning Services',
    creditAccount: 'Cash',
    amount: 200,
  },
  {
    id: '18',
    date: '2025-02-01T12:30:00Z',
    description: 'Client consultation fee',
    debitAccount: 'Cash',
    creditAccount: 'Revenue',
    amount: 800,
  },
  {
    id: '19',
    date: '2025-02-02T09:45:00Z',
    description: 'Travel expenses - Client meeting',
    debitAccount: 'Travel Expenses',
    creditAccount: 'Cash',
    amount: 125.75,
  },
  {
    id: '20',
    date: '2025-02-03T14:20:00Z',
    description: 'Equipment maintenance - Printer repair',
    debitAccount: 'Equipment Maintenance',
    creditAccount: 'Cash',
    amount: 95.00,
  },
];

export function TransactionsList() {
  const { data: transactions, isLoading, error, mutate } = useGetTransactions();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Delete confirmation state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    transactionId: string | null;
    transactionDescription: string;
  }>({
    isOpen: false,
    transactionId: null,
    transactionDescription: '',
  });
  
  // Use fallback data if there's an error, no data, or empty array (production)
  const transactionArray = (error || !transactions || !Array.isArray(transactions) || transactions.length === 0) 
    ? fallbackTransactions 
    : transactions;
  
  // Apply filtering and pagination
  const {
    filters,
    filteredTransactions,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    handleFiltersChange,
    handleClearFilters,
    handlePageChange,
    handlePageSizeChange,
  } = useTransactionFilters(transactionArray);

  console.log('TransactionsList - data:', transactions);
  console.log('TransactionsList - data type:', typeof transactions);
  console.log('TransactionsList - isArray:', Array.isArray(transactions));
  console.log('TransactionsList - isLoading:', isLoading);
  console.log('TransactionsList - error:', error);

  const handleDeleteTransaction = (id: string) => {
    const transaction = transactionArray.find(t => t.id === id);
    if (transaction) {
      setDeleteDialog({
        isOpen: true,
        transactionId: id,
        transactionDescription: transaction.description,
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.transactionId) return;

    try {
      const updatedTransactions = transactionArray.filter(t => t.id !== deleteDialog.transactionId);
      mutate(updatedTransactions, false);

      setDeleteDialog({
        isOpen: false,
        transactionId: null,
        transactionDescription: '',
      });

      console.log('Transaction deleted:', deleteDialog.transactionId);
      
    } catch (error) {
      mutate(transactions, false);
      console.error('Failed to delete transaction:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      isOpen: false,
      transactionId: null,
      transactionDescription: '',
    });
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
        <h2 className="text-sm font-bold">Transactions</h2>
        <div className="border rounded-lg overflow-hidden">
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
        <h2 className="text-sm font-bold">Transactions</h2>
        <div className="text-center py-8">
          <p className="text-xs text-destructive">Error loading transactions.</p>
        </div>
      </div>
    );
  }

  if (transactionArray.length === 0) {
    console.log('TransactionsList: Showing empty state');
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-bold">Transactions</h2>
        <div className="text-center py-8">
          <p className="text-xs text-muted-foreground">No transactions found.</p>
        </div>
      </div>
    );
  }

  console.log('TransactionsList: Showing data state with', filteredTransactions.length, 'transactions');
  
  const TableHeader = () => {
    if (isMobile) return null;
    
    return (
      <div className="grid grid-cols-12 gap-3 p-3 bg-muted/30 border-b text-xs font-bold text-muted-foreground">
        <div className="col-span-3">Description</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Debit Account</div>
        <div className="col-span-2">Credit Account</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-1"></div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-md flex items-center gap-2">
        Transactions
      </h3>
      
      <FilterModal
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        totalTransactions={transactionArray.length}
        filteredCount={totalItems}
      />
      
      <div className="border rounded-lg overflow-hidden">
        <TableHeader />
        {filteredTransactions.map((txn: Transaction) => (
          <TransactionRow 
            key={txn.id} 
            transaction={txn} 
            onDelete={handleDeleteTransaction}
          />
        ))}
      </div>
      
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        description={`Are you sure you want to delete the transaction "${deleteDialog.transactionDescription}"? This action cannot be undone.`}
      />
    </div>
  );
}