import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';

async function main() {
  if (import.meta.env.DEV) {
    // Disabled MSW for now - using only fallback data
    // const { worker } = await import('./mocks/browser');
    // worker.start();
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
