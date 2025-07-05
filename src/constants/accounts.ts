export const ACCOUNT_TYPES = [
  'Cash',
  'Checking Account',
  'Savings Account', 
  'Accounts Receivable',
  'Accounts Payable',
  'Revenue',
  'Expenses',
  'Equipment',
  'Inventory',
  'Loans Payable',
  "Owner's Equity",
  'Sales',
  'Marketing',
  'Office Supplies',
  'Utilities',
  'Office Expenses',
  'Rent Expense'
] as const;

export type AccountType = typeof ACCOUNT_TYPES[number];

// Map account names to their type: 'asset', 'liability', 'equity', 'revenue', 'expense'
export const ACCOUNT_TYPE_MAP: Record<string, 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'> = {
  // Assets (debit increases, credit decreases)
  'Cash': 'asset',
  'Checking Account': 'asset',
  'Savings Account': 'asset',
  'Accounts Receivable': 'asset',
  'Equipment': 'asset',
  'Inventory': 'asset',
  'Office Supplies': 'asset',
  
  // Liabilities (debit decreases, credit increases)
  'Accounts Payable': 'liability',
  'Loans Payable': 'liability',
  
  // Equity (debit decreases, credit increases)
  "Owner's Equity": 'equity',
  
  // Revenue (debit decreases, credit increases)
  'Revenue': 'revenue',
  'Sales': 'revenue',
  
  // Expenses (debit increases, credit decreases)
  'Expenses': 'expense',
  'Marketing': 'expense',
  'Utilities': 'expense',
  'Office Expenses': 'expense',
  'Rent Expense': 'expense',
}; 