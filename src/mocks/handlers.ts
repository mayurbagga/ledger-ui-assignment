import { rest } from 'msw';

// Example in-memory data
let transactions = [
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
  rest.get('/api/transactions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(transactions));
  }),

  // POST /transactions
  rest.post('/api/transactions', async (req, res, ctx) => {
    const data = await req.json();
    const newTransaction = { ...data, id: String(Date.now()) };
    transactions.push(newTransaction);
    return res(ctx.status(201), ctx.json(newTransaction));
  }),
];
