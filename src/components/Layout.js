import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from './Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
export function Layout(_a) {
    var children = _a.children, sidebarContent = _a.sidebarContent, onAddTransaction = _a.onAddTransaction, onToggleBalances = _a.onToggleBalances;
    var isMobile = useMediaQuery('(max-width: 768px)');
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Header, { onAddTransaction: onAddTransaction, onToggleBalances: onToggleBalances }), isMobile ? (
            // Mobile layout - single column
            _jsx("main", { className: "max-w-2xl mx-auto p-4", children: children })) : (
            // Desktop layout - two columns with sidebar
            _jsx("div", { className: "max-w-7xl mx-auto p-4", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: children }), sidebarContent && (_jsx("div", { className: "lg:col-span-1", children: sidebarContent }))] }) }))] }));
}
