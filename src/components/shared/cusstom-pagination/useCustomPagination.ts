import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { env } from '@/env';

import type { PaginationProps } from '@/config/types';

export const useCustomPagination = (props: PaginationProps) => {
  const { baseURL, totalPages, maxVisiblePages = 5 } = props;
  const [currentPage, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
    shallow: false,
  });

  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1)
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [currentPage, totalPages, maxVisiblePages]);

  const createPageUrl = (pageNumber: number) => {
    const url = new URL(baseURL, env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set('page', pageNumber.toString());
    return url.toString();
  };

  const handleEllipsisClick = (direction: 'left' | 'right') => {
    const newPage =
      direction === 'left'
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);

    setPage(newPage);
  };
  return {
    currentPage,
    visibleRange,
    createPageUrl,
    handleEllipsisClick,
    setPage,
    totalPages,
  };
};
