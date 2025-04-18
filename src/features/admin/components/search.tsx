'use client';
import { SearchInput } from '@/components/shared/search-input';
import { usePathname } from 'next/navigation';

export const AdminSearch = () => {
  const pathname = usePathname();
  return (
    <SearchInput
      placeholder={`Search ${pathname.split('/')[2] ? pathname.split('/')[2] : 'something'}...`}
      className="w-full focus-visible:ring-0 placeholder:text-muted-foreground text-foreground bg-muted border border-border rounded-md pl-8"
    />
  );
};
