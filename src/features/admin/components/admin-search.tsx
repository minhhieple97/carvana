'use client';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

import { SearchInput } from '@/components/shared/search-input';

export const AdminSearchSkeleton = () => {
  return <div className="h-9 w-full animate-pulse rounded-md bg-muted" />;
};

export const AdminSearch = () => {
  const pathname = usePathname();
  return (
    <SearchInput
      placeholder={`Search ${pathname.split('/')[2] ? pathname.split('/')[2] : 'something'}...`}
      className="w-full focus-visible:ring-0 placeholder:text-muted-foreground text-foreground bg-muted border border-border rounded-md pl-8"
    />
  );
};

export const AdminSearchWithSuspense = () => {
  return (
    <Suspense fallback={<AdminSearchSkeleton />}>
      <AdminSearch />
    </Suspense>
  );
};
