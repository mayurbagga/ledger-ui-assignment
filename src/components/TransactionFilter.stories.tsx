import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionFilter } from './TransactionFilter';
import { ThemeProvider } from '@/providers/ThemeProvider';

const meta: Meta<typeof TransactionFilter> = {
  title: 'Components/TransactionFilter',
  component: TransactionFilter,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-full max-w-2xl">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    filters: {
      control: 'object',
    },
    totalTransactions: {
      control: { type: 'number', min: 0 },
    },
    filteredCount: {
      control: { type: 'number', min: 0 },
    },
    onFiltersChange: {
      action: 'filters changed',
    },
    onClearFilters: {
      action: 'filters cleared',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFilters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  debitAccount: 'all',
  creditAccount: 'all',
  amountMin: '',
  amountMax: '',
  sortBy: 'date-desc' as const,
};

export const Default: Story = {
  args: {
    filters: defaultFilters,
    totalTransactions: 50,
    filteredCount: 50,
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: {
      ...defaultFilters,
      search: 'office supplies',
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
      debitAccount: 'Office Supplies',
      amountMin: '100',
      amountMax: '500',
    },
    totalTransactions: 50,
    filteredCount: 3,
  },
};

export const WithSearchFilter: Story = {
  args: {
    filters: {
      ...defaultFilters,
      search: 'consulting',
    },
    totalTransactions: 50,
    filteredCount: 8,
  },
};

export const WithDateRange: Story = {
  args: {
    filters: {
      ...defaultFilters,
      dateFrom: '2024-01-15',
      dateTo: '2024-01-20',
    },
    totalTransactions: 50,
    filteredCount: 12,
  },
};

export const WithAccountFilters: Story = {
  args: {
    filters: {
      ...defaultFilters,
      debitAccount: 'Cash',
      creditAccount: 'Revenue',
    },
    totalTransactions: 50,
    filteredCount: 15,
  },
};

export const WithAmountRange: Story = {
  args: {
    filters: {
      ...defaultFilters,
      amountMin: '1000',
      amountMax: '5000',
    },
    totalTransactions: 50,
    filteredCount: 7,
  },
};

export const WithSorting: Story = {
  args: {
    filters: {
      ...defaultFilters,
      sortBy: 'amount-desc',
    },
    totalTransactions: 50,
    filteredCount: 50,
  },
};

export const MobileView: Story = {
  args: {
    filters: defaultFilters,
    totalTransactions: 50,
    filteredCount: 50,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopView: Story = {
  args: {
    filters: defaultFilters,
    totalTransactions: 50,
    filteredCount: 50,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const NoResults: Story = {
  args: {
    filters: {
      ...defaultFilters,
      search: 'nonexistent',
    },
    totalTransactions: 50,
    filteredCount: 0,
  },
}; 