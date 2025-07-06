import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useSearchState } from '@/hooks/useSearchState';

interface GlobalSearchInputProps {
  placeholder?: string;
  className?: string;
}

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = React.memo(({
  placeholder = "Search descriptions...",
  className = "h-8 text-xs"
}) => {
  const { searchValue, handleSearchChange } = useSearchState();

  return (
    <div className="space-y-1">
      <Label htmlFor="search" className="text-xs font-medium flex items-center gap-2">
        <Search className="h-3 w-3" />
        Search
      </Label>
      <Input
        id="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
        className={className}
        autoComplete="off"
      />
    </div>
  );
}); 