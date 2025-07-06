import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

interface AmountRangeFilterProps {
  onApplyFilter: (minAmount: string, maxAmount: string) => void;
  className?: string;
}

export const AmountRangeFilter: React.FC<AmountRangeFilterProps> = React.memo(({
  onApplyFilter,
  className = "h-8 text-xs"
}) => {
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleApplyFilter = () => {
    onApplyFilter(minAmount, maxAmount);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium flex items-center gap-2">
        <DollarSign className="h-3 w-3" />
        Amount Range
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Min Amount</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            className={className}
            step="0.01"
            min="0"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Max Amount</Label>
          <Input
            type="number"
            placeholder="∞"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            className={className}
            step="0.01"
            min="0"
          />
        </div>
      </div>
      <Button
        onClick={handleApplyFilter}
        size="sm"
        className="w-full h-8 text-xs"
      >
        Apply Amount Filter
      </Button>
    </div>
  );
}); 