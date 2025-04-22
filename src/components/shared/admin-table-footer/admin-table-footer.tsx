'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent } from 'react';

import { Select, TableRow } from '@/components/ui';
import { TableCell } from '@/components/ui';
import { TableFooter } from '@/components/ui';

import { CustomPagination } from '../cusstom-pagination';

import type { AwaitedPageProps, FilterOptions } from '@/config/types';

const itemsPerPageOptions: FilterOptions<string, string> = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

type AdminTableFooterProps = {
  disabled: boolean;
  totalPages: number;
  baseURL: string;
  cols: number;
  searchParams: AwaitedPageProps['searchParams'];
};

export const AdminTableFooter = (props: AdminTableFooterProps) => {
  const { disabled, totalPages, baseURL, cols, searchParams } = props;
  const itemsPerPage = searchParams?.itemsPerPage || '10';
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(currentSearchParams.toString());
    newSearchParams.set(e.target.name, e.target.value);
    newSearchParams.set('page', '1');
    router.push(`${baseURL}?${newSearchParams.toString()}`);
  };

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
            {totalPages > 1 && (
              <CustomPagination
                totalPages={totalPages}
                baseURL={baseURL}
                styles={{
                  paginationRoot: 'justify-end',
                  paginationPrevious: 'border border-border hover:bg-accent text-foreground',
                  paginationNext: 'border border-border hover:bg-accent text-foreground',
                  paginationLink: 'border border-border hover:bg-accent text-foreground',
                  paginationLinkActive: 'bg-primary !text-primary-foreground border-primary',
                }}
              />
            )}
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
