import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionsList } from './components/TransactionsList';

function App() {
  const [showBalances, setShowBalances] = useState(false);

  const handleAddTransaction = () => {
    console.log('Add transaction clicked - will implement form later');
    // TODO: Open transaction form modal/dialog
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
    console.log('Balances toggled:', !showBalances);
  };

  return (
    <Layout onAddTransaction={handleAddTransaction} onToggleBalances={handleToggleBalances}>
      {showBalances && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h2 className="text-lg font-semibold mb-2">Account Balances</h2>
          <p className="text-sm text-gray-600">Account balances will be displayed here</p>
        </div>
      )}
      <TransactionsList />
    </Layout>
  );
}

export default App;