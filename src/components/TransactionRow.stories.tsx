import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionRow } from './TransactionRow';
import { Transaction } from '@/types/api';

const meta: Meta<typeof TransactionRow> = {
  title: 'Components/TransactionRow',
  component: TransactionRow,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      control: 'object',
    },
    onDelete: {
      action: 'delete',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample transaction data
const sampleTransaction: Transaction = {
  id: '1',
  date: '2024-01-15',
  description: 'Office supplies purchase',
  debitAccount: 'Office Expenses',
  creditAccount: 'Cash',
  amount: 150.00,
};

const largeAmountTransaction: Transaction = {
  id: '2',
  date: '2024-01-20',
  description: 'Client payment for consulting services',
  debitAccount: 'Cash',
  creditAccount: 'Accounts Receivable',
  amount: 5000.00,
};

const longDescriptionTransaction: Transaction = {
  id: '3',
  date: '2024-01-25',
  description: 'This is a very long transaction description that might overflow and need to be truncated properly in the UI',
  debitAccount: 'Cash',
  creditAccount: 'Accounts Receivable',
  amount: 250.75,
};

const negativeAmountTransaction: Transaction = {
  id: '4',
  date: '2024-01-30',
  description: 'Refund to customer',
  debitAccount: 'Accounts Payable',
  creditAccount: 'Cash',
  amount: -75.50,
};

export const Default: Story = {
  args: {
    transaction: sampleTransaction,
  },
};

export const LargeAmount: Story = {
  args: {
    transaction: largeAmountTransaction,
  },
};

export const LongDescription: Story = {
  args: {
    transaction: longDescriptionTransaction,
  },
};

export const NegativeAmount: Story = {
  args: {
    transaction: negativeAmountTransaction,
  },
};

export const WithDeleteButton: Story = {
  args: {
    transaction: sampleTransaction,
    onDelete: (id: string) => console.log('Delete transaction:', id),
  },
};

export const MultipleRows: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <TransactionRow transaction={sampleTransaction} />
      <TransactionRow transaction={largeAmountTransaction} />
      <TransactionRow transaction={longDescriptionTransaction} />
      <TransactionRow transaction={negativeAmountTransaction} />
    </div>
  ),
};

export const MobileLayout: Story = {
  args: {
    transaction: sampleTransaction,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopLayout: Story = {
  args: {
    transaction: sampleTransaction,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}; 