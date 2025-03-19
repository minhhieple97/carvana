'use client';

import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryStates } from 'nuqs';
import { type ChangeEvent, useEffect, useState } from 'react';

import { SearchInput, RangeFilter, TaxonomyFilters } from '@/components/shared';
import { routes } from '@/config/routes';
import { env } from '@/env';
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils';

import type { SidebarProps } from '@/config/types';

export const Sidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;
  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(''),
      model: parseAsString.withDefault(''),
      modelVariant: parseAsString.withDefault(''),
      minYear: parseAsString.withDefault(''),
      maxYear: parseAsString.withDefault(''),
      minPrice: parseAsString.withDefault(''),
      maxPrice: parseAsString.withDefault(''),
      minReading: parseAsString.withDefault(''),
      maxReading: parseAsString.withDefault(''),
      currency: parseAsString.withDefault(''),
      odoUnit: parseAsString.withDefault(''),
      transmission: parseAsString.withDefault(''),
      fuelType: parseAsString.withDefault(''),
      bodyType: parseAsString.withDefault(''),
      colour: parseAsString.withDefault(''),
      doors: parseAsString.withDefault(''),
      seats: parseAsString.withDefault(''),
      ulezCompliance: parseAsString.withDefault(''),
    },
    {
      shallow: false,
    }
  );

  useEffect(() => {
    const filterCount = Object.entries(searchParams as Record<string, string>).filter(
      ([key, value]) => key !== 'page' && value
    ).length;

    setFilterCount(filterCount);
  }, [searchParams]);

  const clearFilters = () => {
    const url = new URL(routes.classifieds, env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
    setFilterCount(0);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setQueryStates({
      [name]: value || null,
    });

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }

    router.refresh();
  };

  return (
    <aside className="w-[21.25rem] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <div className="sticky top-4">
        <div className="border-b border-gray-100 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!filterCount}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                filterCount
                  ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  : 'cursor-not-allowed text-gray-300'
              )}
            >
              Clear all {filterCount ? `(${filterCount})` : null}
            </button>
          </div>
          <SearchInput
            placeholder="Search classifieds..."
            className="w-full rounded-lg border-gray-200 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
          />
        </div>

        <div className="max-h-[calc(100vh-12rem)] space-y-7 overflow-y-auto p-5">
          <TaxonomyFilters searchParams={searchParams} handleChange={handleChange} />

          {/* Uncomment and update other filters as needed */}
        </div>
      </div>
    </aside>
  );
};
