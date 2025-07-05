import React from 'react';
import { Header } from './Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface LayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  onAddTransaction?: () => void;
  onToggleBalances?: () => void;
}

export function Layout({ children, sidebarContent, onAddTransaction, onToggleBalances }: LayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTransaction={onAddTransaction} onToggleBalances={onToggleBalances} />
      
      {isMobile ? (
        // Mobile layout - single column
        <main className="max-w-2xl mx-auto p-4">{children}</main>
      ) : (
        // Desktop layout - two columns with sidebar
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              {children}
            </div>
            
            {/* Sidebar */}
            {sidebarContent && (
              <div className="lg:col-span-1">
                {sidebarContent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 