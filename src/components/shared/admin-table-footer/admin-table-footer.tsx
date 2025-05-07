'use client';

import { Select, TableRow, TableCell, TableFooter } from '@/components/ui';
import { Suspense } from 'react';

import { CustomPagination } from '../cusstom-pagination';
import { itemsPerPageOptions, useAdminTableFooter } from './useAdminTableFooter';

import type { AwaitedPageProps } from '@/config/types';

type AdminTableFooterProps = {
  disabled: boolean;
  totalPages: number;
  baseURL: string;
  cols: number;
  searchParams: AwaitedPageProps['searchParams'];
};

export const AdminTableFooterSkeleton = ({ cols }: { cols: number }) => {
  return (
    <TableFooter className="border-t border-border bg-background">
      <TableRow className="hover:bg-muted/50">
        <TableCell colSpan={cols}>
          <div className="flex items-center justify-between py-2">
            <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            <div className="flex gap-1">
              <div className="h-9 w-9 animate-pulse rounded bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export const AdminTableFooter = (props: AdminTableFooterProps) => {
  const { disabled, totalPages, baseURL, cols, searchParams } = props;
  const { itemsPerPage, handleItemsPerPage } = useAdminTableFooter({
    baseURL,
    searchParams,
  });

  return (
    <TableFooter className="border-t border-border bg-background">
      <TableRow className="hover:bg-muted/50">
        <TableCell colSpan={cols}>
          <div className="flex items-center justify-between py-2">
            <Select
              name="itemsPerPage"
              value={itemsPerPage as string}
              onChange={handleItemsPerPage}
              options={itemsPerPageOptions}
              disabled={disabled && totalPages <= 1}
              className="-mt-1 w-24"
              noDefault={false}
              selectClassName="bg-background text-foreground border-border hover:border-input-border focus:ring-ring/20"
            />
            {totalPages > 1 && <CustomPagination totalPages={totalPages} baseURL={baseURL} />}
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export const AdminTableFooterWithSuspense = (props: AdminTableFooterProps) => {
  return (
    <Suspense fallback={<AdminTableFooterSkeleton cols={props.cols} />}>
      <AdminTableFooter {...props} />
    </Suspense>
  );
};
