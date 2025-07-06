import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Search, X, DollarSign, Filter, Building2, ArrowUpDown } from 'lucide-react';
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

interface FilterModalProps {
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

export const FilterModal: React.FC<FilterModalProps> = React.memo(({
  filters,
  onFiltersChange,
  onClearFilters,
  totalTransactions,
  filteredCount,
}) => {
  const [open, setOpen] = React.useState(false);
  const [dateFromOpen, setDateFromOpen] = React.useState(false);
  const [dateToOpen, setDateToOpen] = React.useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const minAmountRef = useRef<HTMLInputElement>(null);
  const maxAmountRef = useRef<HTMLInputElement>(null);

  const hasActiveFilters = React.useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'debitAccount' || key === 'creditAccount') {
        return value !== 'all';
      }
      if (key === 'sortBy') {
        return value !== 'date-desc';
      }
      return value !== '';
    });
  }, [filters]);

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
    
    // Close the modal after applying filters
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  const handleClearFilters = () => {
    onFiltersChange(defaultFilters);
    onClearFilters();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
        >
          <Filter className="mr-2 h-3 w-3" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {Object.entries(filters).filter(([key, value]) => {
                if (key === 'debitAccount' || key === 'creditAccount') {
                  return value !== 'all';
                }
                if (key === 'sortBy') {
                  return value !== 'date-desc';
                }
                return value !== '';
              }).length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4" />
            Filter Transactions
          </DialogTitle>
        </DialogHeader>
        
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
              <Label className="text-xs font-medium flex items-center gap-2">
                <CalendarIcon className="h-3 w-3" />
                From Date
              </Label>
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
              <Label className="text-xs font-medium flex items-center gap-2">
                <CalendarIcon className="h-3 w-3" />
                To Date
              </Label>
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
              <Label className="text-xs font-medium flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                Debit Account
              </Label>
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
              <Label className="text-xs font-medium flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                Credit Account
              </Label>
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
            <Label className="text-xs font-medium flex items-center gap-2">
              <ArrowUpDown className="h-3 w-3" />
              Sort By
            </Label>
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

          {/* Results count */}
          <div className="text-xs text-muted-foreground">
            Showing {filteredCount} of {totalTransactions} transactions
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleApplyFilters}
              size="sm"
              className="flex-1 h-8 text-xs"
            >
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 text-xs"
              >
                <X className="mr-2 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}); 