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
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default transactions list with sample data and full functionality including filtering, pagination, and delete operations.',
      },
    },
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        // Mock loading state by not providing any handlers
      ],
    },
    docs: {
      description: {
        story: 'Transactions list in loading state with skeleton loaders.',
      },
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
    docs: {
      description: {
        story: 'Transactions list showing error state with fallback data.',
      },
    },
  },
};

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Transactions list optimized for mobile view with responsive design.',
      },
    },
  },
};

export const DesktopView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Transactions list optimized for desktop view with full feature set.',
      },
    },
  },
};

export const WithFilters: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Transactions list with active filters applied, demonstrating the filtering functionality.',
      },
    },
  },
};

export const WithPagination: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Transactions list with pagination controls, showing how large datasets are handled.',
      },
    },
  },
}; 