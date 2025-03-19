'use client';

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { useCustomPagination } from './useCustomPagination';

import type { PaginationProps } from '@/features/classifieds/types';

export const CustomPagination = (props: PaginationProps) => {
  const { styles } = props;
  const { currentPage, visibleRange, createPageUrl, handleEllipsisClick, setPage, totalPages } =
    useCustomPagination(props);

  return (
    <PaginationRoot className={styles.paginationRoot}>
      <PaginationContent className="lg:gap-4 justify-end">
        <PaginationItem>
          <PaginationPrevious
            className={cn(currentPage <= 1 && 'hidden', styles.paginationPrevious)}
            href={createPageUrl(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={styles.paginationLink}
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
                className={cn(styles.paginationLink, isActive && styles.paginationLinkActive)}
                {...(rel ? { rel } : {})}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={styles.paginationLink}
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
            className={cn(currentPage >= totalPages && 'hidden', styles.paginationNext)}
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
