import { http } from 'msw';

interface TransactionData {
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

// Example in-memory data with more transactions
const transactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial balance',
    debitAccount: 'Cash',
    creditAccount: 'Owner\'s Equity',
    amount: 1000,
  },
  {
    id: '2',
    date: '2024-01-02',
    description: 'Office supplies',
    debitAccount: 'Office Expenses',
    creditAccount: 'Cash',
    amount: 150,
  },
  {
    id: '3',
    date: '2024-01-03',
    description: 'Client payment',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 500,
  },
];

// Define handlers for your API endpoints
export const handlers = [
  // GET /transactions
  http.get('/api/transactions', () => {
    return Response.json(transactions);
  }),

  // POST /transactions
  http.post('/api/transactions', async ({ request }) => {
    const data = await request.json() as TransactionData;
    const newTransaction = { ...data, id: String(Date.now()) };
    // Note: In a real app, you'd update the transactions array here
    return Response.json(newTransaction, { status: 201 });
  }),
];
