import { useMemo } from 'react';
import { useGetTransactions } from '@/api/generated/ledgerAPI';
import { calculateAccountBalances } from '@/utils/accounting';
export function useAccountBalances() {
    var _a = useGetTransactions(), transactions = _a.data, error = _a.error, isLoading = _a.isLoading;
    var balances = useMemo(function () {
        if (!transactions)
            return [];
        if (!Array.isArray(transactions)) {
            console.error('Transactions is not an array:', transactions);
            return [];
        }
        return calculateAccountBalances(transactions);
    }, [transactions]);
    return {
        balances: balances,
        isLoading: isLoading,
        error: error,
    };
}
