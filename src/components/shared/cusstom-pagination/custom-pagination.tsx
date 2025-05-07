'use client';

import { Suspense } from 'react';
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

const paginationStyles = {
  root: 'w-full justify-end',
  content: 'justify-end gap-1 md:gap-2 items-center',
  link: 'min-w-[32px] h-[32px] flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
  linkActive:
    'bg-primary text-primary-foreground border-primary hover:bg-primary/90 font-semibold shadow-sm border',
  ellipsis:
    'flex min-w-[32px] h-[32px] items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200',
  nav: 'h-auto border border-border bg-background hover:bg-accent hover:text-accent-foreground text-foreground px-2.5 py-1 rounded-md transition-colors duration-200',
  disabled: 'opacity-50 pointer-events-none current-not-allowed',
};

export const CustomPaginationSkeleton = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2 justify-end h-9">
      <div className="w-8 h-8 animate-pulse rounded-md bg-muted" />
      <div className="w-8 h-8 animate-pulse rounded-md bg-muted" />
      <div className="w-8 h-8 animate-pulse rounded-md bg-muted" />
      <div className="w-8 h-8 animate-pulse rounded-md bg-muted" />
      <div className="w-8 h-8 animate-pulse rounded-md bg-muted" />
    </div>
  );
};

export const CustomPagination = (props: PaginationProps) => {
  const { styles } = props;
  const { currentPage, visibleRange, createPageUrl, handleEllipsisClick, setPage, totalPages } =
    useCustomPagination(props);

  return (
    <PaginationRoot className={cn(paginationStyles.root, styles?.paginationRoot)}>
      <PaginationContent className={paginationStyles.content}>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              paginationStyles.nav,
              currentPage <= 1 && paginationStyles.disabled,
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
              className={cn(paginationStyles.ellipsis, styles?.paginationLink)}
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
                  paginationStyles.link,
                  isActive && paginationStyles.linkActive,
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
              className={cn(paginationStyles.ellipsis, styles?.paginationLink)}
            >
              <PaginationEllipsis />
            </button>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              paginationStyles.nav,
              currentPage >= totalPages && paginationStyles.disabled,
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

export const CustomPaginationWithSuspense = (props: PaginationProps) => {
  return (
    <Suspense fallback={<CustomPaginationSkeleton />}>
      <CustomPagination {...props} />
    </Suspense>
  );
};
