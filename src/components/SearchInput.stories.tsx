import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearchChange: { action: 'search changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search descriptions...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'groceries',
    placeholder: 'Search descriptions...',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Type to search...',
  },
}; 