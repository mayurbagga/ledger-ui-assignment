# Ledger UI Assignment

A modern double-entry ledger UI built with React, TypeScript, SWR, and ShadCN UI components.

## Current Status: Foundation Complete 

### Completed Features
- **Core Infrastructure**: API client generation (Orval), SWR integration, MSW mocking
- **UI Components**: Responsive layout, header, transactions list, account balance summary
- **Theme System**: Dark/light mode with smooth transitions and persistence
- **Storybook**: 5 components with 15 comprehensive stories
- **Responsive Design**: Mobile/desktop optimized layouts

### Features to be Completed
- Transaction creation form
- Form validation
- Optimistic updates
- Testing suite

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v3, ShadCN UI components
- **State Management**: SWR for server state
- **API**: Orval for client generation, MSW for mocking
- **Development**: Storybook, ESLint
- **Testing**: Vitest, Testing Library (planned)

## Installation

```bash
npm install
```

## Development

```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build for production
npm run build

# Run tests (when implemented)
npm run test
```

## Project Structure

```
src/
├── api/                 # Generated API client
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # Application constants
```

## Features

### Core Functionality
- **Account Balance Summary**: Categorized display of assets and liabilities
- **Transactions List**: Enhanced display with proper error handling
- **Responsive Layout**: Mobile-first design with desktop optimization
- **Theme Toggle**: Dark/light mode with system preference detection

### Development Experience
- **API Mocking**: Realistic sample data with network delays
- **Storybook**: Interactive component documentation
- **Type Safety**: Full TypeScript coverage
- **Hot Reload**: Fast development with Vite

## Storybook

Access Storybook at `http://localhost:6006` to view:
- Component documentation
- Interactive examples
- Responsive design testing
- Theme variations

## Configuration

- **Orval**: API client generation from OpenAPI spec
- **MSW**: API mocking for development
- **Tailwind**: Custom CSS variables for theming
- **ESLint**: Code quality and consistency

## Production Deployment

### MSW Service Worker Setup
This project uses MSW (Mock Service Worker) for API mocking in both development and production. The service worker is configured to work on Vercel and other hosting platforms.

**Environment Variables:**
```bash
# Enable MSW in production (set to 'true' to enable mocking in production)
VITE_ENABLE_MSW=false

# API base URL (for when you have a real backend)
VITE_API_BASE_URL=http://localhost:3000/api
```

**For Demo/Assignment:**
- Set `VITE_ENABLE_MSW=true` in your Vercel environment variables
- This will enable the mock data to show in production

**For Real Production:**
- Set `VITE_ENABLE_MSW=false` 
- Deploy a real backend API
- Update `VITE_API_BASE_URL` to point to your production API

## Next Steps

1. **Transaction Form**: Build form component with validation
2. **SWR Mutations**: Implement transaction creation
3. **Optimistic Updates**: Add optimistic UI updates
4. **Testing**: Add comprehensive test suite
5. **Documentation**: Complete API documentation

## Notes

- ShadCN UI components are manually copied from the official documentation
- API mocking runs only in development mode
- Theme preferences are persisted in localStorage
- Responsive design switches between mobile and desktop layouts

## Documentation & Progress

See [`CHECKLIST.md`](./CHECKLIST.md) for detailed progress, requirement mapping, and implementation notes.
