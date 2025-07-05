import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onAddTransaction: { action: 'transaction added' },
    onToggleBalances: { action: 'balances toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAddTransaction: () => {
      console.log('Transaction button clicked');
    },
    onToggleBalances: () => {
      console.log('Balances toggled');
    },
  },
};

export const WithMockTransaction: Story = {
  args: {
    onAddTransaction: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Transaction added with delay');
    },
    onToggleBalances: () => {
      console.log('Balances toggled');
    },
  },
}; 