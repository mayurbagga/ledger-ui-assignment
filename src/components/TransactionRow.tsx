import React from 'react';
import { Transaction } from '@/types/api';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/accounting';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, ArrowRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface TransactionRowProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

export const TransactionRow = React.memo(({ transaction, onDelete }: TransactionRowProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="p-3 hover:bg-muted/20 transition-colors active:bg-muted/40 w-full overflow-x-hidden">
        <div className="space-y-2 w-full">
          {/* Header: Date and Amount */}
          <div className="flex items-start justify-between gap-3 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {formatRelativeTime(transaction.date)}
              </p>
              <p className="font-medium text-xs leading-relaxed mt-1 break-words">
                {transaction.description}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="outline" className="font-mono text-xs font-semibold whitespace-nowrap">
                {formatCurrency(transaction.amount)}
              </Badge>
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(transaction.id)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive hover:border-destructive h-7 w-7 p-0 touch-manipulation border-destructive/20 bg-destructive/5"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Account Flow */}
          <div className="w-full overflow-x-auto">
            <div className="flex items-center gap-2 text-xs pb-1 min-w-max">
              <Badge 
                variant="secondary" 
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 flex-shrink-0 text-xs px-2 py-1"
              >
                {transaction.debitAccount}
              </Badge>
              <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <Badge 
                variant="secondary" 
                className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800 flex-shrink-0 text-xs px-2 py-1"
              >
                {transaction.creditAccount}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="grid grid-cols-12 gap-3 p-3 hover:bg-muted/30 transition-colors group w-full items-center">
      <div className="col-span-2 flex flex-col items-start justify-center">
        <span className="text-xs font-medium leading-tight">{formatDate(transaction.date)}</span>
        <span className="text-xs text-muted-foreground/70 leading-tight">{formatRelativeTime(transaction.date)}</span>
      </div>
      <div className="col-span-3 flex items-center">
        <span className="text-xs leading-relaxed">{transaction.description}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 text-xs px-2 py-1">
          {transaction.debitAccount}
        </Badge>
      </div>
      <div className="col-span-2 flex items-center">
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800 text-xs px-2 py-1">
          {transaction.creditAccount}
        </Badge>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-xs font-semibold font-mono">
          {formatCurrency(transaction.amount)}
        </span>
      </div>
      <div className="col-span-1 flex justify-end items-center">
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(transaction.id)}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive hover:border-destructive opacity-60 group-hover:opacity-100 transition-all duration-200 border-destructive/20 bg-destructive/5 h-7 w-7 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}); 