# Project Checklist

## Feature Checklist
- [x] Tailwind CSS configured (v3 with proper CSS variables)
- [x] ShadCN UI components working
- [x] Alias '@' configured
- [x] API client generation (Orval) - SETUP COMPLETE
- [x] API mocking (MSW) - SETUP COMPLETE
- [x] Layout and Header components
- [x] Transactions list component (basic)
- [ ] Account balances display
- [ ] Transaction form & validation
- [ ] Optimistic updates
- [x] Storybook setup
- [ ] Testing (Vitest, Testing Library)

> Note: ShadCN UI components are being added manually, copied directly from the official [ShadCN UI documentation website](https://ui.shadcn.com/docs/components).

## Progress Notes
- ✅ **Project initialized** - Tailwind and ShadCN Button set up, alias configured
- ✅ **API client generation setup complete** - Orval configured, custom Axios instance created
- ✅ **API client successfully generated** - TypeScript types and SWR hooks created
- ✅ **MSW setup complete** - API mocking with realistic sample data and network delay
- ✅ **Layout and Header components** - Clean, responsive design with proper styling
- ✅ **TransactionsList component** - Basic implementation with SWR hooks and error handling
- ✅ **Tailwind CSS v3 migration** - Fixed styling issues by downgrading from v4 to v3
- ✅ **CSS variables and theming** - Proper shadcn/ui color system implemented

## Mapping to Assignment Requirements
- [x] **Orval API client generation**: Configured in orval.config.ts
- [x] **Custom HTTP client**: Created in src/api/mutator/custom-instance.ts
- [x] **API client generated**: TypeScript types and SWR hooks created
- [x] **MSW integration**: API mocking with realistic data and development-only setup
- [x] **ShadCN UI**: Components copied from official docs and properly styled
- [x] **Responsive design**: Layout and Header components with proper mobile support
- [x] **SWR integration**: useTransactions hook with proper error and loading states

## Next Steps
1. **Account Balance Summary** - Create component to display account balances
2. **Transaction Form** - Build form for creating new transactions
3. **Optimistic Updates** - Implement optimistic UI updates for better UX
4. **Testing** - Add unit and integration tests
5. **Storybook Stories** - Create stories for all components
