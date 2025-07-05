import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionsList } from './components/TransactionsList';
import { AccountBalanceSummary } from './components/AccountBalanceSummary';
import { useAccountBalances } from './hooks/useAccountBalances';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function App() {
  const [showBalances, setShowBalances] = useState(false);
  const { balances, isLoading: balancesLoading, error: balancesError } = useAccountBalances();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAddTransaction = () => {
    console.log('Add transaction clicked - will implement form later');
    // TODO: Open transaction form modal/dialog
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
    console.log('Balances toggled:', !showBalances);
  };

  // Render balance content
  const renderBalanceContent = () => {
    if (balancesLoading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading account balances...</p>
        </div>
      );
    }
    
    if (balancesError) {
      return (
        <div className="text-center py-8">
          <p className="text-sm text-destructive">Error loading account balances.</p>
        </div>
      );
    }
    
    return <AccountBalanceSummary balances={balances} />;
  };

  // Mobile: Show balances in main content when toggled
  // Desktop: Always show balances in sidebar
  const mobileBalanceContent = isMobile && showBalances ? (
    <div className="mb-6">{renderBalanceContent()}</div>
  ) : null;

  const desktopSidebarContent = !isMobile ? renderBalanceContent() : null;

  return (
    <Layout 
      onAddTransaction={handleAddTransaction} 
      onToggleBalances={handleToggleBalances}
      sidebarContent={desktopSidebarContent}
    >
      {mobileBalanceContent}
      <TransactionsList />
    </Layout>
  );
}

export default App;