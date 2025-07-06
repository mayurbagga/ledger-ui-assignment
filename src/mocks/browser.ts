import { setupWorker } from 'msw/browser';
import { http, HttpResponse, delay } from 'msw';
import { sampleTransactions } from './transactions';

interface NewTransaction {
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  date?: string;
}

// In-memory storage for mutations
const transactions = [...sampleTransactions];

const customMockHandlers = [
  // GET transactions - with longer delay to ensure loading state shows
  http.get('/api/transactions', async () => {
    console.log('MSW: Starting GET request with delay...');
    await delay(2000); // 2 second delay to make loading state very visible
    console.log('MSW: Returning transactions data');
    return HttpResponse.json(transactions);
  }),

  // POST transactions - with realistic delay
  http.post('/api/transactions', async ({ request }) => {
    console.log('MSW: POST /api/transactions request received');
    try {
      await delay(500); // 500ms delay for mutation
      const body = await request.json() as NewTransaction;
      console.log('MSW: Request body:', body);
      
      // Validate required fields
      if (!body.description || !body.debitAccount || !body.creditAccount || !body.amount) {
        console.log('MSW: Validation failed - missing required fields');
        return HttpResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      // Validate amount
      if (body.amount <= 0) {
        console.log('MSW: Validation failed - amount must be positive');
        return HttpResponse.json(
          { error: 'Amount must be greater than 0' },
          { status: 400 }
        );
      }
      
      const newTransaction = {
        ...body,
        id: String(Date.now()),
        date: body.date || new Date().toISOString(),
      };
      transactions.push(newTransaction);
      console.log('MSW: Created new transaction:', newTransaction);
      console.log('MSW: Total transactions now:', transactions.length);
      return HttpResponse.json(newTransaction, { status: 201 });
    } catch (error) {
      console.error('MSW: Error creating transaction:', error);
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  // DELETE transactions - with realistic delay
  http.delete('/api/transactions/:id', async ({ params }) => {
    await delay(300); // 300ms delay for delete
    const { id } = params;
    const idx = transactions.findIndex(t => t.id === id);
    if (idx !== -1) {
      transactions.splice(idx, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Fallback handler for unmatched requests
  http.all('*', ({ request }) => {
    console.log('MSW: Unhandled request:', request.method, request.url);
    return HttpResponse.json(
      { error: 'API endpoint not found. Please contact support.' },
      { status: 404 }
    );
  }),
];

// Create and export the worker instance
export const worker = setupWorker(...customMockHandlers);