import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountBalanceSummary } from './AccountBalanceSummary';
import { ThemeProvider } from '@/providers/ThemeProvider';

const meta: Meta<typeof AccountBalanceSummary> = {
  title: 'Components/AccountBalanceSummary',
  component: AccountBalanceSummary,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-full max-w-md">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const Empty: Story = {
  args: {
    balances: [],
  },
};

export const MixedBalances: Story = {
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

export const AllAssets: Story = {
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

export const AllLiabilities: Story = {
  args: {
    balances: [
      { account: 'Accounts Payable', balance: -5000.00 },
      { account: 'Loans Payable', balance: -25000.00 },
    ],
  },
}; 