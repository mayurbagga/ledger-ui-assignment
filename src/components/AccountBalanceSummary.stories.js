import { AccountBalanceSummary } from './AccountBalanceSummary';
var meta = {
    title: 'Components/AccountBalanceSummary',
    component: AccountBalanceSummary,
    parameters: {
        layout: 'centered',
    },
};
export default meta;
export var Default = {
    args: {
        balances: [
            { account: 'Cash', balance: 1250.00 },
            { account: 'Revenue', balance: -1500.00 },
            { account: 'Office Supplies', balance: 250.00 },
            { account: 'Equipment', balance: 800.00 },
            { account: 'Utilities', balance: 120.00 },
        ],
    },
};
export var Empty = {
    args: {
        balances: [],
    },
};
export var MixedBalances = {
    args: {
        balances: [
            { account: 'Cash', balance: 5000.00 },
            { account: 'Accounts Payable', balance: -2500.00 },
            { account: 'Revenue', balance: -7500.00 },
            { account: 'Expenses', balance: 3000.00 },
            { account: 'Equipment', balance: 15000.00 },
        ],
    },
};
export var AllAssets = {
    args: {
        balances: [
            { account: 'Cash', balance: 10000.00 },
            { account: 'Checking Account', balance: 25000.00 },
            { account: 'Savings Account', balance: 50000.00 },
            { account: 'Accounts Receivable', balance: 15000.00 },
            { account: 'Equipment', balance: 20000.00 },
            { account: 'Inventory', balance: 8000.00 },
        ],
    },
};
export var AllLiabilities = {
    args: {
        balances: [
            { account: 'Accounts Payable', balance: -5000.00 },
            { account: 'Loans Payable', balance: -25000.00 },
        ],
    },
};
