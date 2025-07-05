import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionForm } from './TransactionForm';

const meta: Meta<typeof TransactionForm> = {
  title: 'Components/TransactionForm',
  component: TransactionForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (transaction) => {
      console.log('Form submitted:', transaction);
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: async (transaction) => {
      console.log('Form submitted:', transaction);
    },
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async () => {
      throw new Error('Failed to create transaction');
    },
  },
}; 