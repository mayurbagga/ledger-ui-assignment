import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionsList } from './TransactionsList';
import { ThemeProvider } from '@/providers/ThemeProvider';
var meta = {
    title: 'Components/TransactionsList',
    component: TransactionsList,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        function (Story) { return (_jsx(ThemeProvider, { children: _jsx("div", { className: "w-full max-w-2xl", children: _jsx(Story, {}) }) })); },
    ],
};
export default meta;
export var Default = {
    args: {},
};
export var Loading = {
    args: {},
    parameters: {
        msw: {
            handlers: [
            // Mock loading state by not providing any handlers
            ],
        },
    },
};
export var Error = {
    args: {},
    parameters: {
        msw: {
            handlers: [
            // Mock error state
            ],
        },
    },
};
