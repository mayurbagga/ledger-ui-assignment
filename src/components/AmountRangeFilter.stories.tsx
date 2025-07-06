import type { Meta, StoryObj } from '@storybook/react-vite';
import { AmountRangeFilter } from './AmountRangeFilter';

const meta: Meta<typeof AmountRangeFilter> = {
  title: 'Components/AmountRangeFilter',
  component: AmountRangeFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onApplyFilter: { action: 'filter applied' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: "h-10 text-sm",
  },
}; 