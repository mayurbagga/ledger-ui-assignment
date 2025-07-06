import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchWithButton } from './SearchWithButton';

const meta: Meta<typeof SearchWithButton> = {
  title: 'Components/SearchWithButton',
  component: SearchWithButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'search clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search descriptions...',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Type to search...',
  },
}; 