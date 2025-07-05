import { setupWorker } from 'msw/browser';
import { http, HttpResponse, delay } from 'msw';

interface NewTransaction {
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  date?: string;
}

// Realistic sample data
const sampleTransactions = [
  {
    id: '1',
    date: '2024-01-01',
    description: 'Initial balance',
    debitAccount: 'Cash',
    creditAccount: "Owner's Equity",
    amount: 1000,
  },
  {
    id: '2',
    date: '2024-01-02',
    description: 'Office supplies purchase',
    debitAccount: 'Office Expenses',
    creditAccount: 'Cash',
    amount: 150,
  },
  {
    id: '3',
    date: '2024-01-03',
    description: 'Client payment for consulting services',
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
    amount: 500,
  },
  {
    id: '4',
    date: '2024-01-04',
    description: 'Rent payment',
    debitAccount: 'Rent Expense',
    creditAccount: 'Cash',
    amount: 800,
  },
  {
    id: '5',
    date: '2024-01-05',
    description: 'Equipment purchase',
    debitAccount: 'Equipment',
    creditAccount: 'Cash',
    amount: 1200,
  },
];

// In-memory storage for mutations
let transactions = [...sampleTransactions];

const customMockHandlers = [
  // GET transactions - with longer delay to ensure loading state shows
  http.get('*/transactions', async () => {
    console.log('MSW: Starting GET request with delay...');
    await delay(2000); // 2 second delay to make loading state very visible
    console.log('MSW: Returning transactions data');
    return HttpResponse.json(transactions);
  }),

  // POST transactions - with realistic delay
  http.post('*/transactions', async ({ request }) => {
    await delay(500); // 500ms delay for mutation
    const body = await request.json() as NewTransaction;
    const newTransaction = {
      ...body,
      id: String(Date.now()),
      date: body.date || new Date().toISOString().slice(0, 10),
    };
    transactions.push(newTransaction);
    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  // DELETE transactions - with realistic delay
  http.delete('*/transactions/:id', async ({ params }) => {
    await delay(300); // 300ms delay for delete
    const { id } = params;
    const idx = transactions.findIndex(t => t.id === id);
    if (idx !== -1) {
      transactions.splice(idx, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

// Create and export the worker instance
export const worker = setupWorker(...customMockHandlers);