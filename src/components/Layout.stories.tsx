import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './Layout';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AccountBalanceSummary } from './AccountBalanceSummary';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Main Content</h2>
        <p>This is the main content area of the layout.</p>
        <div className="p-4 bg-card border rounded-lg">
          <p>Sample content card</p>
        </div>
      </div>
    ),
  },
};

export const WithSidebar: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Main Content</h2>
        <p>This is the main content area with a sidebar.</p>
        <div className="p-4 bg-card border rounded-lg">
          <p>Sample content card</p>
        </div>
      </div>
    ),
    sidebarContent: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sidebar</h3>
        <AccountBalanceSummary 
          balances={[
            { account: 'Cash', balance: 1250.00 },
            { account: 'Revenue', balance: -1500.00 },
            { account: 'Office Supplies', balance: 250.00 },
          ]} 
        />
      </div>
    ),
  },
};

export const Mobile: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mobile Layout</h2>
        <p>This shows the mobile single-column layout.</p>
        <div className="p-4 bg-card border rounded-lg">
          <p>Sample content card</p>
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 