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
  'Utilities'
] as const;

export type AccountType = typeof ACCOUNT_TYPES[number];

// Map account names to their type: 'asset', 'liability', or null
export const ACCOUNT_TYPE_MAP: Record<string, 'asset' | 'liability' | null> = {
  'Cash': 'asset',
  'Checking Account': 'asset',
  'Savings Account': 'asset',
  'Accounts Receivable': 'asset',
  'Equipment': 'asset',
  'Inventory': 'asset',
  'Office Supplies': 'asset',
  // Liabilities
  'Accounts Payable': 'liability',
  'Loans Payable': 'liability',
  // Not asset or liability (null)
  'Revenue': null,
  'Expenses': null,
  "Owner's Equity": null,
  'Sales': null,
  'Marketing': null,
  'Utilities': null,
}; 