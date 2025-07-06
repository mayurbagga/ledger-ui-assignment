import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterModal } from './FilterModal';

const meta: Meta<typeof FilterModal> = {
  title: 'Components/FilterModal',
  component: FilterModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFiltersChange: { action: 'filters changed' },
    onClearFilters: { action: 'filters cleared' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: {
      search: '',
      dateFrom: '',
      dateTo: '',
      debitAccount: 'all',
      creditAccount: 'all',
      amountMin: '',
      amountMax: '',
      sortBy: 'date-desc',
    },
    totalTransactions: 100,
    filteredCount: 100,
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: {
      search: 'groceries',
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
      debitAccount: 'Cash',
      creditAccount: 'all',
      amountMin: '10',
      amountMax: '1000',
      sortBy: 'amount-desc',
    },
    totalTransactions: 100,
    filteredCount: 15,
  },
}; 