import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchWithButtonProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchWithButton: React.FC<SearchWithButtonProps> = React.memo(({
  onSearch,
  placeholder = "Search descriptions...",
  className = "h-8 text-xs"
}) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="search" className="text-xs font-medium flex items-center gap-2">
        <Search className="h-3 w-3" />
        Search
      </Label>
      <div className="flex gap-2">
        <Input
          id="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={className}
          autoComplete="off"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="h-8 px-3 text-xs"
        >
          Search
        </Button>
      </div>
    </div>
  );
}); 