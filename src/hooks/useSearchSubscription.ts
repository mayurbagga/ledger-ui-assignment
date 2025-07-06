import { useEffect } from 'react';

// Global state outside of React
let searchValue = '';
let searchCallbacks: ((value: string) => void)[] = [];

export const updateSearch = (value: string) => {
  searchValue = value;
  searchCallbacks.forEach(callback => callback(value));
};

export const subscribeToSearch = (callback: (value: string) => void) => {
  searchCallbacks.push(callback);
  return () => {
    searchCallbacks = searchCallbacks.filter(cb => cb !== callback);
  };
};

// Hook to subscribe to search changes
export const useSearchSubscription = (callback: (value: string) => void) => {
  useEffect(() => {
    const unsubscribe = subscribeToSearch(callback);
    return unsubscribe;
  }, [callback]);
}; 