import React, { useState, useMemo, useCallback, memo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Search, X, DollarSign } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ACCOUNT_TYPES } from '@/constants/accounts';


export interface TransactionFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
  debitAccount: string;
  creditAccount: string;
  amountMin: string;
  amountMax: string;
  sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'description-asc' | 'description-desc';
}

interface TransactionFilterProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onClearFilters: () => void;
  totalTransactions: number;
  filteredCount: number;
}

const defaultFilters: TransactionFilters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  debitAccount: 'all',
  creditAccount: 'all',
  amountMin: '',
  amountMax: '',
  sortBy: 'date-desc',
};

export const TransactionFilter: React.FC<TransactionFilterProps> = memo(({
  filters,
  onFiltersChange,
  onClearFilters,
  totalTransactions,
  filteredCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'debitAccount' || key === 'creditAccount') {
        return value !== 'all';
      }
      if (key === 'sortBy') {
        return value !== 'date-desc'; // Only count as active if not default sort
      }
      return value !== '';
    });
  }, [filters]);



  const handleClearFilters = useCallback(() => {
    onFiltersChange(defaultFilters);
    onClearFilters();
  }, [onFiltersChange, onClearFilters]);

  const searchRef = useRef<HTMLInputElement>(null);
  const minAmountRef = useRef<HTMLInputElement>(null);
  const maxAmountRef = useRef<HTMLInputElement>(null);

  const handleApplyFilters = () => {
    const searchValue = searchRef.current?.value || '';
    const minAmount = minAmountRef.current?.value || '';
    const maxAmount = maxAmountRef.current?.value || '';
    
    onFiltersChange({
      ...filters,
      search: searchValue,
      amountMin: minAmount,
      amountMax: maxAmount,
    });
    
    // Hide the filter panel after applying filters
    setIsExpanded(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  const FilterContent = () => (
    <div className="space-y-4" onKeyPress={handleKeyPress}>
      {/* Search */}
      <div className="space-y-1">
        <Label htmlFor="search" className="text-xs font-medium flex items-center gap-2">
          <Search className="h-3 w-3" />
          Search
        </Label>
        <Input
          ref={searchRef}
          id="search"
          placeholder="Search descriptions..."
          defaultValue={filters.search}
          className="h-8 text-xs"
          autoComplete="off"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium">From Date</Label>
          <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-full justify-start text-left font-normal text-xs"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {filters.dateFrom ? new Date(filters.dateFrom).toLocaleDateString() : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
                onSelect={(date) => {
                  onFiltersChange({
                    ...filters,
                    dateFrom: date ? date.toISOString().split('T')[0] : '',
                  });
                  setDateFromOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">To Date</Label>
          <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-full justify-start text-left font-normal text-xs"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {filters.dateTo ? new Date(filters.dateTo).toLocaleDateString() : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
                onSelect={(date) => {
                  onFiltersChange({
                    ...filters,
                    dateTo: date ? date.toISOString().split('T')[0] : '',
                  });
                  setDateToOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Account Filters */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium">Debit Account</Label>
          <Select
            value={filters.debitAccount}
            onValueChange={(value) => onFiltersChange({ ...filters, debitAccount: value })}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All accounts</SelectItem>
              {ACCOUNT_TYPES.map((account) => (
                <SelectItem key={account} value={account} className="text-xs">
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Credit Account</Label>
          <Select
            value={filters.creditAccount}
            onValueChange={(value) => onFiltersChange({ ...filters, creditAccount: value })}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All accounts</SelectItem>
              {ACCOUNT_TYPES.map((account) => (
                <SelectItem key={account} value={account} className="text-xs">
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Amount Range */}
      <div className="space-y-2">
        <Label className="text-xs font-medium flex items-center gap-2">
          <DollarSign className="h-3 w-3" />
          Amount Range
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Min Amount</Label>
            <Input
              ref={minAmountRef}
              type="number"
              placeholder="0.00"
              defaultValue={filters.amountMin}
              className="h-8 text-xs"
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Max Amount</Label>
            <Input
              ref={maxAmountRef}
              type="number"
              placeholder="∞"
              defaultValue={filters.amountMax}
              className="h-8 text-xs"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-1">
        <Label className="text-xs font-medium">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as TransactionFilters['sortBy'] })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc" className="text-xs">Latest First</SelectItem>
            <SelectItem value="date-asc" className="text-xs">Oldest First</SelectItem>
            <SelectItem value="amount-desc" className="text-xs">Amount (High to Low)</SelectItem>
            <SelectItem value="amount-asc" className="text-xs">Amount (Low to High)</SelectItem>
            <SelectItem value="description-asc" className="text-xs">Description (A-Z)</SelectItem>
            <SelectItem value="description-desc" className="text-xs">Description (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Filters Button */}
      <Button
        onClick={handleApplyFilters}
        size="sm"
        className="w-full h-8 text-xs"
      >
        Apply Filters
      </Button>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="w-full h-8 text-xs"
        >
          <X className="mr-2 h-3 w-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Mobile: Toggle for advanced search */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-8 text-xs"
        >
          <Search className="mr-2 h-3 w-3" />
          {isExpanded ? 'Hide Search' : 'Advanced Search'}
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {Object.entries(filters).filter(([key, value]) => {
                if (key === 'debitAccount' || key === 'creditAccount') {
                  return value !== 'all';
                }
                if (key === 'sortBy') {
                  return value !== 'date-desc'; // Only count as active if not default sort
                }
                return value !== '';
              }).length}
            </span>
          )}
        </Button>

        {isExpanded && (
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <FilterContent />
            </CardContent>
          </Card>
        )}

        {/* Results count */}
        <div className="text-xs text-muted-foreground">
          Showing {filteredCount} of {totalTransactions} transactions
        </div>
      </div>
    );
  }

  // Desktop: Toggle for advanced search
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-8 text-xs"
      >
        <Search className="mr-2 h-3 w-3" />
        {isExpanded ? 'Hide Search' : 'Advanced Search'}
        {hasActiveFilters && (
          <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
            {Object.entries(filters).filter(([key, value]) => {
              if (key === 'debitAccount' || key === 'creditAccount') {
                return value !== 'all';
              }
              if (key === 'sortBy') {
                return value !== 'date-desc'; // Only count as active if not default sort
              }
              return value !== '';
            }).length}
          </span>
        )}
      </Button>

      {isExpanded && (
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <FilterContent />
          </CardContent>
        </Card>
      )}

      {/* Results count */}
      <div className="text-xs text-muted-foreground">
        Showing {filteredCount} of {totalTransactions} transactions
      </div>
    </div>
  );
}); 