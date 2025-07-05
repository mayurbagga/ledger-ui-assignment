import { setupWorker } from 'msw/browser';
import { http, HttpResponse, delay } from 'msw';
import { sampleTransactions, generateRealisticTransaction } from './transactions';

interface TransactionData {
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}


const customMockHandlers = [
  // GET transactions
  http.get('*/transactions', async () => {
    await delay(500); // network latency
    return HttpResponse.json(sampleTransactions);
  }),

  // POST transactions
  http.post('*/transactions', async ({ request }) => {
    await delay(500);
    const body = await request.json() as TransactionData;
    const newTransaction = generateRealisticTransaction(body);
    sampleTransactions.push(newTransaction);
    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  // DELETE transactions
  http.delete('*/transactions/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    const idx = sampleTransactions.findIndex(t => t.id === id);
    if (idx !== -1) sampleTransactions.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

// Create and export the worker instance
export const worker = setupWorker(...customMockHandlers);