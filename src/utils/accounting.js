export var calculateAccountBalances = function (transactions) {
    if (!Array.isArray(transactions)) {
        console.error('calculateAccountBalances - transactions is not an array:', transactions);
        return [];
    }
    var balances = {};
    transactions.forEach(function (transaction) {
        // Debit increases the account balance
        if (!balances[transaction.debitAccount]) {
            balances[transaction.debitAccount] = 0;
        }
        balances[transaction.debitAccount] += transaction.amount;
        // Credit decreases the account balance
        if (!balances[transaction.creditAccount]) {
            balances[transaction.creditAccount] = 0;
        }
        balances[transaction.creditAccount] -= transaction.amount;
    });
    return Object.entries(balances)
        .map(function (_a) {
        var account = _a[0], balance = _a[1];
        return ({ account: account, balance: balance });
    })
        .sort(function (a, b) { return a.account.localeCompare(b.account); });
};
export var formatCurrency = function (amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};
export var formatDate = function (dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
