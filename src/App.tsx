import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionsList } from './components/TransactionsList';
import { AccountBalanceSummary } from './components/AccountBalanceSummary';
import { TransactionForm } from './components/TransactionForm';
import { useAccountBalances } from './hooks/useAccountBalances';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from './components/ui/button';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

function App() {
  const [showBalances, setShowBalances] = useState(false);
  const { balances, isLoading: balancesLoading } = useAccountBalances();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDevelopment = import.meta.env.DEV;

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const handleAddTransaction = () => {
    setShowTransactionForm(true);
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
    console.log('Balances toggled:', !showBalances);
  };

  // Render balance content
  const renderBalanceContent = () => {
    // Show loading state only in development with MSW
    if (balancesLoading && isDevelopment) {
      return (
        <div className="space-y-4">
          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-muted animate-pulse">
              <div className="h-4 bg-muted-foreground/20 rounded w-16 mb-2"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-24"></div>
            </div>
            <div className="p-4 rounded-lg bg-muted animate-pulse">
              <div className="h-4 bg-muted-foreground/20 rounded w-20 mb-2"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-24"></div>
            </div>
          </div>
          
          {/* Account Balances Skeleton */}
          <div className="border rounded-lg p-4">
            <div className="h-5 bg-muted-foreground/20 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-2">
                  <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Show balances (will use fallback data in production if needed)
    return <AccountBalanceSummary balances={balances} />;
  };

  // Mobile: Show balances in main content when toggled
  // Desktop: Always show balances in sidebar
  const mobileBalanceContent = isMobile && showBalances ? (
    <div className="mb-6">{renderBalanceContent()}</div>
  ) : null;

  const desktopSidebarContent = !isMobile ? renderBalanceContent() : null;

  return (
    <>
      <Toaster />
      <Layout 
        onAddTransaction={handleAddTransaction} 
        onToggleBalances={handleToggleBalances}
        sidebarContent={desktopSidebarContent}
      >
        {mobileBalanceContent}
        <TransactionsList />
      </Layout>
      
      {showTransactionForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-bold">Create New Transaction</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTransactionForm(false)}
                  className="h-7 w-7 p-0"
                >
                  <span className="sr-only">Close</span>
                  ×
                </Button>
              </div>
              <TransactionForm 
                onSuccess={() => {
                  setShowTransactionForm(false);
                  toast.success('Transaction created successfully!');
                }}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;