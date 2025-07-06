# Assignment to Implementation Mapping

This document will map each requirement from the interview homework to its implementation in this project.

## Assignment

**Senior Frontend Engineer – Interview Homework**

### Overview
As part of the interview process, we ask candidates to complete a short technical assignment to help us evaluate practical skills in React development, UI component design, integration with APIs, and modern frontend workflows. The goal is to build a simple double-entry ledger UI that displays transactions, account balances, and allows creating new transactions.

### Objective
Implement a minimal double-entry Ledger UI using TypeScript and React, integrating with a provided OpenAPI specification. You will design clean, reusable UI components, integrate SWR for data fetching, generate API clients with Orval, and use ShadCN UI as the core component library.

### Functional Requirements
#### Core Features
- **Transactions List**
  - Display a list of transactions showing:
    - Date
    - Description
    - Debit Account
    - Credit Account
    - Amount
- **Account Balances**
  - Display aggregated balances per account based on transactions.
- **Create Transaction Form**
  - Allow creation of a new transaction with:
    - Description
    - Debit Account
    - Credit Account
    - Amount
  - **Validation Rules:**
    - Debit and Credit accounts cannot be the same
    - Amounts must be a valid number

#### Required Features
- Use ShadCN UI for form inputs, tables/lists, buttons, and any modals or toasts.
- Use SWR for data fetching and mutations.
- Generate API client hooks using Orval from the provided OpenAPI specification
- Build Storybook stories for:
  - Transaction Row component
  - Account Balance Summary component
  - Transaction Form component
- Write component and integration tests for:
  - Rendering of transactions and balances
  - Form validation
  - Optimistic update flow when creating a transaction

### Technical Requirements
- Use TypeScript throughout the codebase.
- Use React with functional components and hooks.
- Use ShadCN UI as the component library and styling system.
- Integrate SWR with Orval-generated hooks.
- Implement a clean folder and module structure.
- Include input validation in forms (AJV, Zod, or other).
- Include basic error handling

### Bonus (Optional but Encouraged)
- Implement date selection for the transaction form using ShadCN DatePicker.
- Add filtering to the transaction list by account.
- Implement theme toggling (light/dark) using ShadCN theming.
- Deploy the project to Vercel or Netlify and include the deployment link in your README.

### Expectations
- Professional, idiomatic TypeScript and React code
- Clean, readable component structure with thoughtful abstraction
- Effective use of ShadCN UI components
- Demonstrated understanding of optimistic updates with SWR
- Good Storybook coverage for key components
- Testing approach that ensures confidence in functionality and correctness

### Submission Guidelines
- Provide a GitHub repository link or ZIP file of the project.
- Include a README.md with:
  - Setup instructions
  - Any assumptions or trade-offs made
  - Brief explanation of design decisions
  - Deployment link (if bonus attempted)

### OpenAPI Specification
Use the following minimal example for generating your SWR-based API hooks via Orval:

```yaml
openapi: 3.0.0
info:
  title: Ledger API
  version: 1.0.0
paths:
  /transactions:
    get:
      summary: Get Transactions
      responses:
        '200':
          description: List of transactions
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Transaction'
    post:
      summary: Create Transaction
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewTransaction'
      responses:
        '201':
          description: Transaction created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'
    delete:
      summary: Delete Transaction
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Transaction deleted
components:
  schemas:
    Transaction:
      type: object
      properties:
        id:
          type: string
        date:
          type: string
          format: date
        description:
          type: string
        debitAccount:
          type: string
        creditAccount:
          type: string
        amount:
          type: number
    NewTransaction:
      type: object
      properties:
        description:
          type: string
        debitAccount:
          type: string
        creditAccount:
          type: string
        amount:
          type: number
```

**Note:** I added the DELETE endpoint to the OpenAPI specification to enable complete CRUD functionality, as it's essential for a practical ledger application.

## Additional Implementations Beyond Requirements

### MSW (Mock Service Worker) Integration
While not explicitly required in the assignment, I implemented MSW for API mocking during development. This was essential because:
- **Realistic Development Environment**: MSW provides realistic API behavior with network delays and error scenarios
- **Testing Edge Cases**: Allows testing of loading states, error handling, and network failures
- **Production-like Experience**: Developers can work with realistic data without a backend
- **Better Testing**: Enables comprehensive testing of API interactions and error scenarios

### DELETE API Endpoint
I added a DELETE endpoint to the OpenAPI specification to enable transaction deletion functionality. This was important because:
- **Complete CRUD Operations**: A ledger application should support full CRUD functionality
- **User Experience**: Users expect to be able to delete incorrect transactions
- **Practical Application**: Real-world financial applications require delete capabilities
- **Professional Implementation**: Demonstrates understanding of complete API design

## Mapping to Requirements

See [`CHECKLIST.md`](./CHECKLIST.md) for detailed progress and mapping to each requirement.

- ShadCN UI: Button component integrated and working (manual copy from the official [ShadCN UI documentation website](https://ui.shadcn.com/docs/components)). Other components will be added as needed, following the same pattern.

## Implementation Status

All requirements have been completed with additional enhancements for a production-ready application.

## Demo Application Notes

This is a demo application deployed on Vercel. The backend API is not available in production, so:
- **Form submissions** will show appropriate error messages explaining this is a demo
- **Data is static** - transactions and balances are sample data
- **All functionality works** - filtering, pagination, theme switching, etc.
- **Real application** would connect to a live backend API

The error messages are designed to be user-friendly and explain the demo nature of the application. The application can be further refined with advanced features like virtual scrolling, real-time updates, export functionality, and enterprise-grade monitoring for production deployment.
