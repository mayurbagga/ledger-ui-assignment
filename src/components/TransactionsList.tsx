
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
import type { Transaction } from '@/api/generated/model/transaction';

export function TransactionsList() {
  const { data: transactions, isLoading, error } = useGetTransactions();

  console.log('TransactionsList - data:', transactions);
  console.log('TransactionsList - data type:', typeof transactions);
  console.log('TransactionsList - isArray:', Array.isArray(transactions));
  console.log('TransactionsList - isLoading:', isLoading);
  console.log('TransactionsList - error:', error);

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error loading transactions.</div>;
  
  // Handle case where data might not be an array
  const transactionArray = Array.isArray(transactions) ? transactions : [];
  
  if (transactionArray.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>
      <ul className="space-y-2">
        {transactionArray.map((txn: Transaction) => (
          <li key={txn.id} className="p-3 border rounded-lg bg-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className="text-sm text-muted-foreground">{txn.date}</p>
                <p className="text-sm">
                  {txn.debitAccount} → {txn.creditAccount}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold">${(txn.amount || 0).toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}