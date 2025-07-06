import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Filter, DollarSign, Building2, Search, BarChart3, ArrowUpDown } from 'lucide-react';
import { AccountBalanceFilters } from '@/hooks/useAccountBalanceFilters';

interface AccountBalanceFilterModalProps {
  filters: AccountBalanceFilters;
  onFiltersChange: (filters: AccountBalanceFilters) => void;
  onClearFilters: () => void;
  totalAccounts: number;
  filteredCount: number;
}

const accountTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'asset', label: 'Assets' },
  { value: 'liability', label: 'Liabilities' },
  { value: 'equity', label: 'Equity' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'expense', label: 'Expenses' },
];

const sortOptions = [
  { value: 'account-asc', label: 'Account Name (A-Z)' },
  { value: 'account-desc', label: 'Account Name (Z-A)' },
  { value: 'balance-asc', label: 'Balance (Low to High)' },
  { value: 'balance-desc', label: 'Balance (High to Low)' },
];

export const AccountBalanceFilterModal: React.FC<AccountBalanceFilterModalProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalAccounts,
  filteredCount,
}) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<AccountBalanceFilters>(filters);
  const balanceMinRef = useRef<HTMLInputElement>(null);
  const balanceMaxRef = useRef<HTMLInputElement>(null);

  // Sync local filters with props when they change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const applyFilters = () => {
    const newFilters: AccountBalanceFilters = {
      search: localFilters.search,
      accountType: localFilters.accountType,
      balanceMin: balanceMinRef.current?.value || '',
      balanceMax: balanceMaxRef.current?.value || '',
      sortBy: localFilters.sortBy,
    };
    console.log('Applying filters:', newFilters);
    onFiltersChange(newFilters);
    setOpen(false); // Close the modal after applying filters
  };

  const handleClearFilters = () => {
    const clearedFilters: AccountBalanceFilters = {
      search: '',
      accountType: 'all',
      balanceMin: '',
      balanceMax: '',
      sortBy: 'account-asc',
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
    setOpen(false); // Close the modal after clearing filters
  };

  const hasActiveFilters = filters.search || 
    filters.accountType !== 'all' || 
    filters.balanceMin || 
    filters.balanceMax;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <Filter className="h-3 w-3 mr-1" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
              {filteredCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4" />
            Account Balance Filters
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Filter Summary */}
          <div className="text-xs text-muted-foreground">
            Showing {filteredCount} of {totalAccounts} accounts
          </div>

          {/* Account Selection Dropdown */}
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-2">
              <Search className="h-3 w-3" />
              Select Account
            </Label>
            <Select
              value={localFilters.search || "all"}
              onValueChange={(value) => setLocalFilters({ ...localFilters, search: value === "all" ? "" : value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All accounts</SelectItem>
                <SelectItem value="Cash" className="text-xs">Cash</SelectItem>
                <SelectItem value="Equipment" className="text-xs">Equipment</SelectItem>
                <SelectItem value="Revenue" className="text-xs">Revenue</SelectItem>
                <SelectItem value="Marketing" className="text-xs">Marketing</SelectItem>
                <SelectItem value="Utilities" className="text-xs">Utilities</SelectItem>
                <SelectItem value="Office Supplies" className="text-xs">Office Supplies</SelectItem>
                <SelectItem value="Software Licenses" className="text-xs">Software Licenses</SelectItem>
                <SelectItem value="Insurance" className="text-xs">Insurance</SelectItem>
                <SelectItem value="Meals & Entertainment" className="text-xs">Meals & Entertainment</SelectItem>
                <SelectItem value="Contractor Expenses" className="text-xs">Contractor Expenses</SelectItem>
                <SelectItem value="Website Expenses" className="text-xs">Website Expenses</SelectItem>
                <SelectItem value="Bank Fees" className="text-xs">Bank Fees</SelectItem>
                <SelectItem value="Cleaning Services" className="text-xs">Cleaning Services</SelectItem>
                <SelectItem value="Travel Expenses" className="text-xs">Travel Expenses</SelectItem>
                <SelectItem value="Equipment Maintenance" className="text-xs">Equipment Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account Type Filter */}
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-2">
              <BarChart3 className="h-3 w-3" />
              Account Type
            </Label>
            <Select
              value={localFilters.accountType}
              onValueChange={(value) => setLocalFilters({ ...localFilters, accountType: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accountTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Balance Range */}
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-2">
              <DollarSign className="h-3 w-3" />
              Balance Range
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="minBalance" className="text-xs text-muted-foreground">Min</Label>
                <Input
                  ref={balanceMinRef}
                  id="minBalance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={filters.balanceMin}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="maxBalance" className="text-xs text-muted-foreground">Max</Label>
                <Input
                  ref={balanceMaxRef}
                  id="maxBalance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={filters.balanceMax}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-2">
              <ArrowUpDown className="h-3 w-3" />
              Sort By
            </Label>
            <Select
              value={localFilters.sortBy}
              onValueChange={(value: AccountBalanceFilters['sortBy']) => setLocalFilters({ ...localFilters, sortBy: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Single Apply Button */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={applyFilters} 
              size="sm" 
              className="flex-1 h-8 text-xs"
            >
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button 
                onClick={handleClearFilters} 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 