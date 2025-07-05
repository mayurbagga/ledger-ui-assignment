import React from 'react';
import { BookOpen, Plus, BarChart3 } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddTransaction?: () => void;
  onToggleBalances?: () => void;
}

export function Header({ onAddTransaction, onToggleBalances }: HeaderProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between w-full">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold truncate">Ledger UI</h1>
              <p className="text-xs text-muted-foreground hidden xs:block">
                Double-entry bookkeeping
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme Toggle */}
           

            {/* Balances Toggle - Only on Mobile */}
            {isMobile && (
              <button
                onClick={onToggleBalances}
                className="h-9 w-9 p-0 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            )}

            {/* New Transaction Button */}
            <button
              onClick={onAddTransaction}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
} 