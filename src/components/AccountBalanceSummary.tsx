import React from 'react';
import { AccountBalance } from '@/types/api';
import { formatCurrency } from '@/utils/accounting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ACCOUNT_TYPE_MAP } from '@/constants/accounts';

interface AccountBalanceSummaryProps {
  balances: AccountBalance[];
}

export const AccountBalanceSummary = React.memo(({ balances }: AccountBalanceSummaryProps) => {
  // Assets: positive balances (debit increases, credit decreases)
  const totalAssets = balances
    .filter(b => ACCOUNT_TYPE_MAP[b.account] === 'asset')
    .reduce((sum, b) => sum + Math.max(0, b.balance), 0);
  
  // Liabilities: negative balances (debit decreases, credit increases)
  const totalLiabilities = balances
    .filter(b => ACCOUNT_TYPE_MAP[b.account] === 'liability')
    .reduce((sum, b) => sum + Math.abs(Math.min(0, b.balance)), 0);

  // Calculate net worth (Assets - Liabilities)
  const netWorth = totalAssets - totalLiabilities;

  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Mobile Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 rounded-lg p-3 border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Assets</span>
            </div>
            <p className="text-xs font-bold text-green-800 dark:text-green-200 font-mono">
              {formatCurrency(totalAssets)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 rounded-lg p-3 border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-medium text-red-700 dark:text-red-300">Liabilities</span>
            </div>
            <p className="text-xs font-bold text-red-800 dark:text-red-200 font-mono">
              {formatCurrency(totalLiabilities)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg p-3 border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Net Worth</span>
            </div>
            <p className="text-xs font-bold text-blue-800 dark:text-blue-200 font-mono">
              {formatCurrency(netWorth)}
            </p>
          </div>
        </div>

        {/* Mobile Account Balances */}
        <div className="bg-background border rounded-lg">
          <div className="p-3 border-b">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Account Balances
            </h3>
          </div>
          <div className="p-3">
            {balances.length === 0 ? (
              <div className="text-center py-6">
                <div className="mx-auto w-10 h-10 bg-muted/30 rounded-full flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-xs text-muted-foreground">
                  No account balances to display.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {balances.map((balance) => (
                  <div 
                    key={balance.account} 
                    className="flex justify-between items-center p-2 rounded border bg-background/50 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      ACCOUNT_TYPE_MAP[balance.account] === 'asset' 
                        ? 'bg-green-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'liability'
                        ? 'bg-red-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'equity'
                        ? 'bg-blue-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'revenue'
                        ? 'bg-purple-500'
                        : 'bg-orange-500' // expense
                    }`} />
                      <span className="font-medium text-xs truncate">{balance.account}</span>
                    </div>
                    <Badge
                      variant={
                        ACCOUNT_TYPE_MAP[balance.account] === 'asset' && balance.balance >= 0
                          ? 'default'
                          : ACCOUNT_TYPE_MAP[balance.account] === 'liability' && balance.balance < 0
                          ? 'default'
                          : ACCOUNT_TYPE_MAP[balance.account] === 'equity' && balance.balance < 0
                          ? 'default'
                          : ACCOUNT_TYPE_MAP[balance.account] === 'revenue' && balance.balance < 0
                          ? 'default'
                          : ACCOUNT_TYPE_MAP[balance.account] === 'expense' && balance.balance > 0
                          ? 'default'
                          : 'destructive'
                      }
                      className="font-mono text-xs font-semibold ml-2 flex-shrink-0"
                    >
                      {formatCurrency(balance.balance)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="shadow-sm border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Assets</span>
            </div>
            <p className="text-xs font-bold text-green-800 dark:text-green-200 font-mono">
              {formatCurrency(totalAssets)}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-medium text-red-700 dark:text-red-300">Liabilities</span>
            </div>
            <p className="text-xs font-bold text-red-800 dark:text-red-200 font-mono">
              {formatCurrency(totalLiabilities)}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Net Worth</span>
            </div>
            <p className="text-xs font-bold text-blue-800 dark:text-blue-200 font-mono">
              {formatCurrency(netWorth)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account Balances */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-sm font-bold">
            <Wallet className="h-5 w-5" />
            Account Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          {balances.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground">
                No account balances to display.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {balances.map((balance) => (
                <div 
                  key={balance.account} 
                  className="flex justify-between items-center p-3 rounded-lg border bg-background/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      ACCOUNT_TYPE_MAP[balance.account] === 'asset' 
                        ? 'bg-green-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'liability'
                        ? 'bg-red-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'equity'
                        ? 'bg-blue-500'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'revenue'
                        ? 'bg-purple-500'
                        : 'bg-orange-500' // expense
                    }`} />
                    <span className="font-medium text-xs">{balance.account}</span>
                  </div>
                  <Badge
                    variant={
                      ACCOUNT_TYPE_MAP[balance.account] === 'asset' && balance.balance >= 0
                        ? 'default'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'liability' && balance.balance < 0
                        ? 'default'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'equity' && balance.balance < 0
                        ? 'default'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'revenue' && balance.balance < 0
                        ? 'default'
                        : ACCOUNT_TYPE_MAP[balance.account] === 'expense' && balance.balance > 0
                        ? 'default'
                        : 'destructive'
                    }
                    className="font-mono text-xs font-semibold"
                  >
                    {formatCurrency(balance.balance)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}); 