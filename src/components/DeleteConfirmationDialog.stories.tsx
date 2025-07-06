import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { useState } from 'react';

const meta: Meta<typeof DeleteConfirmationDialog> = {
  title: 'Components/DeleteConfirmationDialog',
  component: DeleteConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    description: {
      control: 'text',
      description: 'The description text in the dialog',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state on the delete button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
const DeleteConfirmationDialogWrapper = (args: React.ComponentProps<typeof DeleteConfirmationDialog>) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Open Delete Dialog
      </button>
      <DeleteConfirmationDialog
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Delete confirmed!');
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DeleteConfirmationDialogWrapper {...args} />,
  args: {
    title: 'Delete Transaction',
    description: 'Are you sure you want to delete the transaction "Office supplies purchase"? This action cannot be undone.',
    isLoading: false,
  },
};

export const Loading: Story = {
  render: (args) => <DeleteConfirmationDialogWrapper {...args} />,
  args: {
    title: 'Delete Transaction',
    description: 'Are you sure you want to delete the transaction "Equipment purchase"? This action cannot be undone.',
    isLoading: true,
  },
};

export const LongDescription: Story = {
  render: (args) => <DeleteConfirmationDialogWrapper {...args} />,
  args: {
    title: 'Delete Transaction',
    description: 'Are you sure you want to delete the transaction "Very long transaction description that might wrap to multiple lines and test the dialog layout with extended text content"? This action cannot be undone and will permanently remove this transaction from the ledger.',
    isLoading: false,
  },
}; 