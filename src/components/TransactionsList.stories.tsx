import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionsList } from './TransactionsList';
import { ThemeProvider } from '@/providers/ThemeProvider';

const meta: Meta<typeof TransactionsList> = {
  title: 'Components/TransactionsList',
  component: TransactionsList,
  parameters: {
    layout: 'centered',
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        // Mock loading state by not providing any handlers
      ],
    },
  },
};

export const Error: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        // Mock error state
      ],
    },
  },
}; 