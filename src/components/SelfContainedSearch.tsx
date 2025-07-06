import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { updateSearch } from '@/hooks/useSearchSubscription';

export const SelfContainedSearch: React.FC = React.memo(() => {
  const [value, setValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the search
    timeoutRef.current = setTimeout(() => {
      updateSearch(newValue);
    }, 500);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="search" className="text-xs font-medium flex items-center gap-2">
        <Search className="h-3 w-3" />
        Search
      </Label>
      <Input
        id="search"
        placeholder="Search descriptions..."
        value={value}
        onChange={handleChange}
        className="h-8 text-xs"
        autoComplete="off"
      />
    </div>
  );
}); 