import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionPagination } from './TransactionPagination';

const meta: Meta<typeof TransactionPagination> = {
  title: 'Components/TransactionPagination',
  component: TransactionPagination,
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
      control: { type: 'select', options: [7, 14, 21, 50] },
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
    totalPages: 5,
    pageSize: 7,
    totalItems: 35,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    pageSize: 14,
    totalItems: 140,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    pageSize: 7,
    totalItems: 35,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 7,
    totalPages: 20,
    pageSize: 7,
    totalItems: 140,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 7,
    totalItems: 5,
  },
};

export const LargePageSize: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    pageSize: 50,
    totalItems: 150,
  },
};

export const WithPageSizeChange: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 7,
    totalItems: 70,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the pagination component with page size selection functionality.',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    pageSize: 7,
    totalItems: 56,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopView: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    pageSize: 7,
    totalItems: 56,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}; 