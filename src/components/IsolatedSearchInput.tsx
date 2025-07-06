import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface IsolatedSearchInputProps {
  initialValue?: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const IsolatedSearchInput: React.FC<IsolatedSearchInputProps> = React.memo(({
  initialValue = '',
  onSearchChange,
  placeholder = "Search descriptions...",
  className = "h-8 text-xs"
}) => {
  const [value, setValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onSearchChangeRef = useRef(onSearchChange);

  // Update the ref when the callback changes
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the search
    timeoutRef.current = setTimeout(() => {
      onSearchChangeRef.current(newValue);
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
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={className}
        autoComplete="off"
      />
    </div>
  );
}); 