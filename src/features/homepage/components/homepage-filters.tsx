'use client';

import { TaxonomyFilters } from '@/components';
import { RangeFilter } from '@/components/shared/range-filter';

import { useHomepageFilters } from '../hooks/useHomepageFilters';

import type { SidebarProps } from '@/config/types';

interface HomepageTaxonomyFiltersProps extends SidebarProps {}

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
