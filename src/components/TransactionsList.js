import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import the SWR hook from Orval
import { useGetTransactions } from '@/api/generated/ledgerAPI';
export function TransactionsList() {
    var _a = useGetTransactions(), transactions = _a.data, isLoading = _a.isLoading, error = _a.error;
    console.log('TransactionsList - data:', transactions);
    console.log('TransactionsList - data type:', typeof transactions);
    console.log('TransactionsList - isArray:', Array.isArray(transactions));
    console.log('TransactionsList - isLoading:', isLoading);
    console.log('TransactionsList - error:', error);
    if (isLoading)
        return _jsx("div", { children: "Loading transactions..." });
    if (error)
        return _jsx("div", { children: "Error loading transactions." });
    // Handle case where data might not be an array
    var transactionArray = Array.isArray(transactions) ? transactions : [];
    if (transactionArray.length === 0) {
        return _jsx("div", { children: "No transactions found." });
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Transactions" }), _jsx("ul", { className: "space-y-2", children: transactionArray.map(function (txn) { return (_jsx("li", { className: "p-3 border rounded-lg bg-card", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: txn.description }), _jsx("p", { className: "text-sm text-muted-foreground", children: txn.date }), _jsxs("p", { className: "text-sm", children: [txn.debitAccount, " \u2192 ", txn.creditAccount] })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "font-mono font-semibold", children: ["$", txn.amount.toFixed(2)] }) })] }) }, txn.id)); }) })] }));
}
