import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onAddTransaction?: () => void;
  onToggleBalances?: () => void;
}

export function Layout({ children, onAddTransaction, onToggleBalances }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTransaction={onAddTransaction} onToggleBalances={onToggleBalances} />
      <main className="max-w-2xl mx-auto p-4">{children}</main>
    </div>
  );
} 