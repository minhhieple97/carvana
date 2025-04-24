'use client';

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from '@/components';
import { cn } from '@/lib/utils';

import { useCustomPagination } from './useCustomPagination';

import type { PaginationProps } from '@/config';

export const CustomPagination = (props: PaginationProps) => {
  const { styles } = props;
  const { currentPage, visibleRange, createPageUrl, handleEllipsisClick, setPage, totalPages } =
    useCustomPagination(props);

  const disabledStyle = 'opacity-50 pointer-events-none cursor-not-allowed';

  return (
    <PaginationRoot className={cn('w-full mt-6', styles?.paginationRoot)}>
      <PaginationContent className="justify-end gap-1 md:gap-2 items-center">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'pagination-nav',
              currentPage <= 1 && disabledStyle,
              styles?.paginationPrevious
            )}
            href={createPageUrl(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          />
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem className="hidden md:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('left');
              }}
              aria-label="Go to previous page group"
              className={cn('pagination-ellipsis', styles?.paginationLink)} // Style as ellipsis
            >
              <PaginationEllipsis />
            </button>
          </PaginationItem>
        )}

        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, index) => visibleRange.start + index
        ).map((pageNumber) => {
          const isActive = pageNumber === currentPage;
          let rel: 'prev' | 'next' | undefined;
          if (pageNumber === currentPage - 1) rel = 'prev';
          if (pageNumber === currentPage + 1) rel = 'next';

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={isActive}
                href={createPageUrl(pageNumber)}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNumber);
                }}
                className={cn(
                  'pagination-link', // Base global class
                  isActive && 'pagination-link-active', // Active global class
                  styles?.paginationLink,
                  isActive && styles?.paginationLinkActive
                )}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
                {...(rel ? { rel } : {})}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden md:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('right');
              }}
              aria-label="Go to next page group"
              className={cn('pagination-ellipsis', styles?.paginationLink)} // Style as ellipsis
            >
              <PaginationEllipsis />
            </button>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              'pagination-nav',
              currentPage >= totalPages && disabledStyle,
              styles?.paginationNext
            )}
            href={createPageUrl(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
