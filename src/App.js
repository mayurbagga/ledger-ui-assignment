import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionsList } from './components/TransactionsList';
import { AccountBalanceSummary } from './components/AccountBalanceSummary';
import { useAccountBalances } from './hooks/useAccountBalances';
import { useMediaQuery } from '@/hooks/useMediaQuery';
function App() {
    var _a = useState(false), showBalances = _a[0], setShowBalances = _a[1];
    var _b = useAccountBalances(), balances = _b.balances, balancesLoading = _b.isLoading, balancesError = _b.error;
    var isMobile = useMediaQuery('(max-width: 768px)');
    var handleAddTransaction = function () {
        console.log('Add transaction clicked - will implement form later');
        // TODO: Open transaction form modal/dialog
    };
    var handleToggleBalances = function () {
        setShowBalances(!showBalances);
        console.log('Balances toggled:', !showBalances);
    };
    // Render balance content
    var renderBalanceContent = function () {
        if (balancesLoading) {
            return (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Loading account balances..." })] }));
        }
        if (balancesError) {
            return (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-sm text-destructive", children: "Error loading account balances." }) }));
        }
        return _jsx(AccountBalanceSummary, { balances: balances });
    };
    // Mobile: Show balances in main content when toggled
    // Desktop: Always show balances in sidebar
    var mobileBalanceContent = isMobile && showBalances ? (_jsx("div", { className: "mb-6", children: renderBalanceContent() })) : null;
    var desktopSidebarContent = !isMobile ? renderBalanceContent() : null;
    return (_jsxs(Layout, { onAddTransaction: handleAddTransaction, onToggleBalances: handleToggleBalances, sidebarContent: desktopSidebarContent, children: [mobileBalanceContent, _jsx(TransactionsList, {})] }));
}
export default App;
