# Ledger UI Assignment

A double-entry ledger UI built with React, TypeScript, and modern web technologies. This project demonstrates a complete frontend application with API integration, mocking, and component-driven development.

## Tech Stack
- **React 19** with TypeScript
- **Tailwind CSS v3** with shadcn/ui design system
- **SWR** for server state management
- **Orval** for API client generation
- **MSW** for API mocking in development
- **Axios** for HTTP requests
- **Storybook** for component development
- **Vitest** for testing
- **Vite** for build tooling

## Features Implemented
- ✅ **API Client Generation** - TypeScript types and SWR hooks auto-generated
- ✅ **API Mocking** - Realistic mock data with network delay simulation
- ✅ **Responsive Layout** - Clean header and centered content layout
- ✅ **Transaction List** - Basic display with loading and error states
- ✅ **Component Library** - ShadCN UI components with proper theming
- ✅ **Development Tools** - Storybook, ESLint, and TypeScript setup

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/mayurbagga/ledger-ui-assignment.git
   cd ledger-ui-assignment
   npm install
   ```

2. Generate the API client (required for first run):
   ```bash
   npm run generate-api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. (Optional) Run Storybook for component development:
   ```bash
   npm run storybook
   ```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate-api` - Generate API client from OpenAPI spec
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run ESLint

## Project Structure
```
src/
├── api/                 # Generated API client and types
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
├── mocks/              # MSW mock handlers
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Development Notes
- **API Mocking**: MSW runs only in development mode and provides realistic sample data
- **Component Development**: Use Storybook for isolated component development
- **Styling**: Tailwind CSS v3 with shadcn/ui design tokens
- **Type Safety**: Full TypeScript coverage with generated API types

## Documentation & Progress
See [`CHECKLIST.md`](./CHECKLIST.md) for detailed progress, requirement mapping, and implementation notes.
