# Ledger UI Assignment

**🌐 Live Demo:** [https://ledger-ui-assignment-ubor.vercel.app/](https://ledger-ui-assignment-ubor.vercel.app/)

**📋 Project Checklist:** [CHECKLIST.md](./CHECKLIST.md)

A modern double-entry ledger UI built with React, TypeScript, SWR, and ShadCN UI components.

## Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **API Integration**: Orval-generated API client with SWR for data fetching
- **UI Components**: ShadCN UI components with responsive design
- **Theme System**: Dark/light mode toggle with system preference detection
- **Account Balances**: Real-time balance calculation with asset/liability categorization
- **Responsive Design**: Mobile-first design with desktop optimizations
- **Storybook**: Component documentation and testing
- **API Mocking**: MSW for development with realistic sample data

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v3, ShadCN UI
- **State Management**: SWR for server state, React Context for theme
- **API**: Orval-generated client with custom Axios instance
- **Testing**: Vitest, Testing Library, Storybook
- **Mocking**: MSW (development only)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
├── api/                 # API client (Orval-generated)
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── mocks/              # MSW handlers
├── providers/          # Context providers
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities
```

## Key Components

### Layout & Header
- Responsive layout with mobile/desktop optimizations
- Theme toggle with system preference detection
- Account balance display with toggle functionality

### Account Balance Summary
- Real-time balance calculation
- Asset/liability categorization
- Responsive design with mobile/desktop layouts
- Loading states and error handling

### Transactions List
- Card-based transaction display
- Responsive design with mobile/desktop layouts
- Error states and loading skeletons
- SWR integration with optimistic updates

### Transaction Row
- Individual transaction display
- Responsive layouts for mobile and desktop
- Delete functionality with confirmation
- Proper date formatting and amount display

## API Integration

The project uses Orval to generate TypeScript API client from OpenAPI specification:

- **Generated Types**: Full TypeScript types for all API endpoints
- **SWR Hooks**: Auto-generated hooks for data fetching
- **Custom Instance**: Axios instance with interceptors and error handling
- **MSW Mocking**: Development-only API mocking with realistic data

## Environment Behavior

- **Development**: MSW with loading states and realistic delays
- **Production**: Fallback data for immediate display
- **Vercel**: Clean deployment with working UI and sample data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
