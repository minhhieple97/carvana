'use client';

import {
  PaginationContent,
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

  return (
    <PaginationRoot className={cn('w-full mt-6', styles?.paginationRoot)}>
      <PaginationContent className="justify-end gap-1 md:gap-2 items-center">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md',
              currentPage <= 1 && 'opacity-50 pointer-events-none',
              styles?.paginationPrevious
            )}
            href={createPageUrl(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem className="hidden md:block">
            <PaginationLink
              className={cn(
                'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md min-w-[32px] h-[32px] flex items-center justify-center',
                styles?.paginationLink
              )}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('left');
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, index) => visibleRange.start + index
        ).map((pageNumber) => {
          const isActive = pageNumber === currentPage;
          let rel = '';

          if (pageNumber === currentPage - 1) {
            rel = 'prev';
          }

          if (pageNumber === currentPage + 1) {
            rel = 'next';
          }

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
                  'min-w-[32px] h-[32px] rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center',
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                  styles?.paginationLink,
                  isActive && styles?.paginationLinkActive
                )}
                {...(rel ? { rel } : {})}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden md:block">
            <PaginationLink
              className={cn(
                'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md min-w-[32px] h-[32px] flex items-center justify-center',
                styles?.paginationLink
              )}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('right');
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md',
              currentPage >= totalPages && 'opacity-50 pointer-events-none',
              styles?.paginationNext
            )}
            href={createPageUrl(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
