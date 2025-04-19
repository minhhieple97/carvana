'use client';
import { Select, TableRow } from '@/components/ui';
import { TableCell } from '@/components/ui';
import { TableFooter } from '@/components/ui';
import type { AwaitedPageProps, FilterOptions } from '@/config/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent } from 'react';
import { CustomPagination } from '../cusstom-pagination';

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
    <TableFooter className="border-primary-800 bg-transparent">
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={cols}>
          <div className="flex items-center justify-between">
            <Select
              name="itemsPerPage"
              value={itemsPerPage as string}
              onChange={handleItemsPerPage}
              options={itemsPerPageOptions}
              disabled={disabled && totalPages <= 1}
              className="-mt-1"
              noDefault={false}
              selectClassName="bg-primary-800 text-muted/75 border-primary-800"
            />
            {totalPages > 1 && (
              <CustomPagination
                totalPages={totalPages}
                baseURL={baseURL}
                styles={{
                  paginationRoot: 'justify-end',
                  paginationPrevious: 'border-none hover:bg-primary-800 text-muted',
                  paginationNext: 'hover:bg-primary-800 text-muted',
                  paginationLink: 'border-none hover:bg-primary-800 text-muted',
                  paginationLinkActive: 'bg-primary-800 !text-white',
                }}
              />
            )}
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
