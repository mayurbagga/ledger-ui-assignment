import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';

async function main() {
  if (import.meta.env.DEV) {
    // Enable MSW for local development
    console.log('Starting MSW worker...');
    const { worker } = await import('./mocks/browser');
    await worker.start();
    console.log('MSW worker started successfully');
    
    // Clear any existing SWR cache to force fresh data
    if (typeof window !== 'undefined') {
      // Clear localStorage cache if any
      localStorage.removeItem('swr-cache');
    }
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

main();
