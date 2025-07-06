import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountBalancePagination } from './AccountBalancePagination';

const meta: Meta<typeof AccountBalancePagination> = {
  title: 'Components/AccountBalancePagination',
  component: AccountBalancePagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
    pageSize: {
      control: { type: 'select', options: [5, 10, 15, 20] },
    },
    totalItems: {
      control: { type: 'number', min: 1 },
    },
    onPageChange: {
      action: 'page changed',
    },
    onPageSizeChange: {
      action: 'page size changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    pageSize: 5,
    totalItems: 15,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    pageSize: 10,
    totalItems: 50,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalPages: 4,
    pageSize: 5,
    totalItems: 20,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 12,
    pageSize: 5,
    totalItems: 60,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    totalItems: 3,
  },
};

export const LargePageSize: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    pageSize: 20,
    totalItems: 35,
  },
};

export const WithPageSizeChange: Story = {
  args: {
    currentPage: 1,
    totalPages: 8,
    pageSize: 5,
    totalItems: 40,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the account balance pagination component with page size selection functionality.',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    currentPage: 2,
    totalPages: 6,
    pageSize: 5,
    totalItems: 30,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopView: Story = {
  args: {
    currentPage: 2,
    totalPages: 6,
    pageSize: 5,
    totalItems: 30,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}; 