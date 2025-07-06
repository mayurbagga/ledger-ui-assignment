import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface AccountBalancePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const pageSizeOptions = [5, 10, 15, 20];

export const AccountBalancePagination: React.FC<AccountBalancePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Total Count Display */}
      <div className="text-center">
        <div className="text-sm font-semibold text-foreground">
          {totalItems} Account{totalItems !== 1 ? 's' : ''} Total
        </div>
        <div className="text-xs text-muted-foreground">
          Showing {startItem} to {endItem} of {totalItems} accounts
        </div>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2">
        <div className="flex items-center space-x-2">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Show:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(parseInt(value))}
            >
              <SelectTrigger className="h-7 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()} className="text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-1">
            {/* First Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="h-7 w-7 p-0"
            >
              <ChevronsLeft className="h-3 w-3" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>

            {/* Page Numbers */}
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 text-xs text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className="h-7 w-7 p-0 text-xs"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}

            {/* Next Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>

            {/* Last Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0"
            >
              <ChevronsRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 