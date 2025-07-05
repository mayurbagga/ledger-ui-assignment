import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from './Layout';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AccountBalanceSummary } from './AccountBalanceSummary';
var meta = {
    title: 'Components/Layout',
    component: Layout,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        function (Story) { return (_jsx(ThemeProvider, { children: _jsx(Story, {}) })); },
    ],
};
export default meta;
export var Default = {
    args: {
        children: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Main Content" }), _jsx("p", { children: "This is the main content area of the layout." }), _jsx("div", { className: "p-4 bg-card border rounded-lg", children: _jsx("p", { children: "Sample content card" }) })] })),
    },
};
export var WithSidebar = {
    args: {
        children: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Main Content" }), _jsx("p", { children: "This is the main content area with a sidebar." }), _jsx("div", { className: "p-4 bg-card border rounded-lg", children: _jsx("p", { children: "Sample content card" }) })] })),
        sidebarContent: (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Sidebar" }), _jsx(AccountBalanceSummary, { balances: [
                        { account: 'Cash', balance: 1250.00 },
                        { account: 'Revenue', balance: -1500.00 },
                        { account: 'Office Supplies', balance: 250.00 },
                    ] })] })),
    },
};
export var Mobile = {
    args: {
        children: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Mobile Layout" }), _jsx("p", { children: "This shows the mobile single-column layout." }), _jsx("div", { className: "p-4 bg-card border rounded-lg", children: _jsx("p", { children: "Sample content card" }) })] })),
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
