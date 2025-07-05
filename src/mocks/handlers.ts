import { http, HttpResponse } from 'msw';

interface TransactionData {
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

// Example in-memory data
const transactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial balance',
    debitAccount: 'Cash',
    creditAccount: 'Owner\'s Equity',
    amount: 1000,
  },
];

// Define handlers for your API endpoints
export const handlers = [
  // GET /transactions
  http.get('/api/transactions', () => {
    return HttpResponse.json(transactions);
  }),

  // POST /transactions
  http.post('/api/transactions', async ({ request }) => {
    const data = await request.json() as TransactionData;
    const newTransaction = { ...data, id: String(Date.now()) };
    return HttpResponse.json(newTransaction, { status: 201 });
  }),
];
