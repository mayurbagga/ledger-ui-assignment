import { useState, useRef, useCallback } from 'react';

// Global search state to avoid re-renders
let globalSearchValue = '';
let globalSearchCallbacks: ((value: string) => void)[] = [];

export const useSearchState = () => {
  const [localValue, setLocalValue] = useState(globalSearchValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateSearch = useCallback((value: string) => {
    globalSearchValue = value;
    // Notify all listeners
    globalSearchCallbacks.forEach(callback => callback(value));
  }, []);

  const subscribeToSearch = useCallback((callback: (value: string) => void) => {
    globalSearchCallbacks.push(callback);
    return () => {
      globalSearchCallbacks = globalSearchCallbacks.filter(cb => cb !== callback);
    };
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the search
    timeoutRef.current = setTimeout(() => {
      updateSearch(value);
    }, 500);
  }, [updateSearch]);

  return {
    searchValue: localValue,
    handleSearchChange,
    subscribeToSearch,
    getGlobalSearchValue: () => globalSearchValue,
  };
}; 