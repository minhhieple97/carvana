'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { SortIcon } from '@/components/shared';
import { TableHead, TableHeader, TableRow } from '@/components/ui';
import { SORT_ORDER, sortOrder, SortOrderType } from '@/config/constants';

type SortableColumnProps<T extends string> = {
  label: string;
  sort: T;
  currentSort: T;
  currentOrder: SortOrderType | null;
  width?: string;
  onSort: (sort: T) => void;
};

export const SortableColumn = <T extends string>({
  label,
  sort,
  currentSort,
  currentOrder,
  width,
  onSort,
}: SortableColumnProps<T>) => {
  return (
    <TableHead className={`text-muted-foreground font-medium ${width || ''}`}>
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors"
        onClick={() => onSort(sort)}
        onKeyDown={() => onSort(sort)}
      >
        {label}
        <SortIcon<T> currentSort={currentSort} currentOrder={currentOrder} sort={sort} />
      </div>
    </TableHead>
  );
};

type NonSortableColumnProps = {
  label: string;
  width?: string;
};

export const NonSortableColumn = ({ label, width }: NonSortableColumnProps) => (
  <TableHead className={`text-muted-foreground font-medium ${width || ''}`}>{label}</TableHead>
);

type SortableTableHeaderProps<T extends string> = {
  initialSort: T;
  initialOrder: SortOrderType;
  sortKeys: readonly T[];
  children: (props: {
    sort: T;
    order: SortOrderType;
    handleSort: (newSort: T) => void;
  }) => React.ReactNode;
};

export const SortableTableHeader = <T extends string>({
  initialSort,
  initialOrder,
  sortKeys,
  children,
}: SortableTableHeaderProps<T>) => {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(sortKeys).withDefault(initialSort).withOptions({ shallow: false })
  );
  const [order, setOrder] = useQueryState(
    'order',
    parseAsStringLiteral(sortOrder).withDefault(initialOrder).withOptions({ shallow: false })
  );

  const handleSort = (newSort: T) => {
    if (newSort === sort) {
      setOrder(order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC);
    } else {
      setSort(newSort);
      setOrder(SORT_ORDER.ASC);
    }
  };

  return (
    <TableHeader>
      <TableRow className="hover:bg-accent/30 border-border/50 bg-card">
        {children({ sort, order: order as SortOrderType, handleSort })}
      </TableRow>
    </TableHeader>
  );
};
