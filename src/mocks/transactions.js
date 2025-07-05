// src/mocks/transactions.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var sampleTransactions = [
    {
        id: '1',
        date: '2024-01-01',
        description: 'Initial balance',
        debitAccount: 'Cash',
        creditAccount: "Owner's Equity",
        amount: 1000,
    },
];
// Generates a new transaction with a unique ID and allows overrides
export function generateRealisticTransaction(override) {
    if (override === void 0) { override = {}; }
    return __assign({ id: "txn-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)), date: new Date().toISOString().slice(0, 10), description: 'New transaction', debitAccount: 'Cash', creditAccount: "Owner's Equity", amount: 100 }, override);
}
