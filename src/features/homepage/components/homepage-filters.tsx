'use client';

import { TaxonomyFilters } from '@/components';
import { RangeFilter } from '@/components/shared/range-filter';
import { Suspense } from 'react';

import { useHomepageFilters } from '../hooks/useHomepageFilters';

import type { SidebarProps } from '@/config/types';

type HomepageTaxonomyFiltersProps = SidebarProps;

export const HomepageTaxonomyFiltersSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-14 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-14 w-full animate-pulse rounded-md bg-muted" />
    </div>
  );
};

export const HomepageTaxonomyFilters = ({
  searchParams,
  minMaxValues,
}: HomepageTaxonomyFiltersProps) => {
  const { _min, _max } = minMaxValues;

  const { handleFilterChange } = useHomepageFilters();

  return (
    <>
      <TaxonomyFilters handleChange={handleFilterChange} searchParams={searchParams} />
      <RangeFilter
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMin={_min.year || 1925}
        defaultMax={_max.year || new Date().getFullYear()}
        handleChange={handleFilterChange}
        searchParams={searchParams}
      />
      <RangeFilter
        label="Price"
        minName="minPrice"
        maxName="maxPrice"
        defaultMin={_min.price || 0}
        defaultMax={_max.price || 21474836}
        handleChange={handleFilterChange}
        searchParams={searchParams}
        increment={1000000}
        thousandSeparator
        currency={{
          currencyCode: 'GBP',
        }}
      />
    </>
  );
};

export const HomepageTaxonomyFiltersWithSuspense = (props: HomepageTaxonomyFiltersProps) => {
  return (
    <Suspense fallback={<HomepageTaxonomyFiltersSkeleton />}>
      <HomepageTaxonomyFilters {...props} />
    </Suspense>
  );
};
