import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { sampleTransactions, generateRealisticTransaction } from './transactions';


const customMockHandlers = [
  // GET transactions
  http.get('*/transactions', async () => {
    return HttpResponse.json(sampleTransactions);
  }),

  // POST transactions
  http.post('*/transactions', async ({ request }) => {
    const body = await request.json();
    const newTransaction = generateRealisticTransaction(body);
    sampleTransactions.push(newTransaction);
    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  // DELETE transactions
  http.delete('*/transactions/:id', async ({ params }) => {
    const { id } = params;
    const idx = sampleTransactions.findIndex(t => t.id === id);
    if (idx !== -1) sampleTransactions.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

// Create and export the worker instance
export const worker = setupWorker(...customMockHandlers);