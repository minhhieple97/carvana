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

  // Define base styles using CSS variables or Tailwind dark mode variants
  const baseLinkStyle =
    'min-w-[32px] h-[32px] rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-accent-foreground';
  const activeLinkStyle = 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90';
  const ellipsisStyle =
    'text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md min-w-[32px] h-[32px] flex items-center justify-center';
  const prevNextStyle =
    'text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-md';
  const disabledStyle = 'opacity-50 pointer-events-none';

  return (
    <PaginationRoot className={cn('w-full mt-6', styles?.paginationRoot)}>
      <PaginationContent className="justify-end gap-1 md:gap-2 items-center">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              prevNextStyle,
              currentPage <= 1 && disabledStyle,
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
              className={cn(ellipsisStyle, styles?.paginationLink)}
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
                  baseLinkStyle,
                  isActive ? activeLinkStyle : '',
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
              className={cn(ellipsisStyle, styles?.paginationLink)}
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
              prevNextStyle,
              currentPage >= totalPages && disabledStyle,
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
