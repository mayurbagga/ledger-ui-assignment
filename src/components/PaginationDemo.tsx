import React from 'react';
import { TransactionPagination } from './TransactionPagination';

// Demo component to show pagination with large numbers
export const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(7);
  
  // Simulate 1000 transactions (143 pages with 7 per page)
  const totalItems = 1000;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-sm font-bold">Pagination Demo - 1000 Items</h3>
      <p className="text-xs text-muted-foreground">
        Total: {totalItems} items, {totalPages} pages, Current: {currentPage}
      </p>
      
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
      
      <div className="text-xs text-muted-foreground">
        <p>Try navigating to different pages to see how the pagination adapts:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Page 1: Shows first few pages + last page</li>
          <li>Page 50: Shows current ± 2 pages + first/last</li>
          <li>Page 143: Shows last few pages + first page</li>
        </ul>
      </div>
    </div>
  );
}; 