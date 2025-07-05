import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionForm } from './TransactionForm';
import { ThemeProvider } from '@/providers/ThemeProvider';

const meta: Meta<typeof TransactionForm> = {
  title: 'Components/TransactionForm',
  component: TransactionForm,
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
    onSuccess: () => {
      console.log('Transaction created successfully');
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSuccess: () => {
      console.log('Transaction created successfully');
    },
  },
};

export const WithError: Story = {
  args: {
    onSuccess: () => {
      console.log('Transaction created successfully');
    },
  },
}; 