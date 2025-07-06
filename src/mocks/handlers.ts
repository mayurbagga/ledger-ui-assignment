import { http } from 'msw';
import { sampleTransactions } from './transactions';

interface TransactionData {
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  date?: string;
}

// Use the updated sample transactions with 2025 dates
let transactions = [...sampleTransactions];

// Define handlers for your API endpoints
export const handlers = [
  // GET /transactions
  http.get('/api/transactions', () => {
    return Response.json(transactions);
  }),

  // POST /transactions
  http.post('/api/transactions', async ({ request }) => {
    const data = await request.json() as TransactionData;
    const newTransaction = { 
      ...data, 
      id: String(Date.now()),
      date: data.date || new Date().toISOString()
    };
    // Add the new transaction to the array
    transactions = [...transactions, newTransaction];
    return Response.json(newTransaction, { status: 201 });
  }),
];
