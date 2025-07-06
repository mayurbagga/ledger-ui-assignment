import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface DirectSearchInputProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const DirectSearchInput: React.FC<DirectSearchInputProps> = React.memo(({
  onSearchChange,
  placeholder = "Search descriptions...",
  className = "h-8 text-xs"
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onSearchChangeRef = useRef(onSearchChange);

  // Update the ref when the callback changes
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  // Set up the input event listener directly on the DOM
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the search
      timeoutRef.current = setTimeout(() => {
        onSearchChangeRef.current(value);
      }, 500);
    };

    // Add event listener directly to DOM
    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-1">
      <Label htmlFor="search" className="text-xs font-medium flex items-center gap-2">
        <Search className="h-3 w-3" />
        Search
      </Label>
      <Input
        ref={inputRef}
        id="search"
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
    </div>
  );
}); 