'use client';
import { useRouter } from 'next/navigation';
import { type ChangeEvent } from 'react';

import type { AwaitedPageProps, FilterOptions } from '@/config/types';

export const itemsPerPageOptions: FilterOptions<string, string> = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

type UseAdminTableFooterProps = {
  baseURL: string;
  searchParams: AwaitedPageProps['searchParams'];
};

export const useAdminTableFooter = ({ baseURL, searchParams }: UseAdminTableFooterProps) => {
  const router = useRouter();
  const itemsPerPage = searchParams?.itemsPerPage || '10';

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams();

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) newSearchParams.set(key, value.toString());
      });
    }

    newSearchParams.set(e.target.name, e.target.value);
    newSearchParams.set('page', '1');

    router.push(`${baseURL}?${newSearchParams.toString()}`);
  };

  return {
    itemsPerPage,
    handleItemsPerPage,
  };
};
