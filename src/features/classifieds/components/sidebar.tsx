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

import { SearchInput, RangeFilter, TaxonomyFilters } from '@/components/shared';
import { Select } from '@/components/ui';
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils';

import { useSidebar } from '../hooks/useSidebar';

import type { SidebarProps } from '@/config/types';

export const Sidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const { _min, _max } = minMaxValues;
  const { filterCount, clearFilters, handleChange, queryStates } = useSidebar({
    searchParams,
  });
  return (
    <aside className="w-72 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-md hidden lg:block">
      <div className="sticky top-4">
        <div className="border-b border-border p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Filters</h2>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!filterCount}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                filterCount
                  ? 'bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground'
                  : 'cursor-not-allowed text-muted-foreground/50'
              )}
            >
              Clear all {filterCount ? `(${filterCount})` : null}
            </button>
          </div>
          <SearchInput placeholder="Search classifieds..." className=" w-full" />
        </div>

        <div className="space-y-7 p-5">
          <TaxonomyFilters searchParams={searchParams} handleChange={handleChange} />

          <RangeFilter
            label="Year"
            minName="minYear"
            maxName="maxYear"
            defaultMin={_min.year || 1925}
            defaultMax={_max.year || new Date().getFullYear()}
            handleChange={handleChange}
            searchParams={searchParams}
          />
          <RangeFilter
            label="Price"
            minName="minPrice"
            maxName="maxPrice"
            defaultMin={_min.price || 0}
            defaultMax={_max.price || 21474836}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={1000000}
            thousandSeparator
            currency={{
              currencyCode: 'GBP',
            }}
          />
          <RangeFilter
            label="Odometer Reading"
            minName="minReading"
            maxName="maxReading"
            defaultMin={_min.odoReading || 0}
            defaultMax={_max.odoReading || 1000000}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={5000}
            thousandSeparator
          />
          <Select
            label="Currency"
            name="currency"
            value={queryStates.currency || ''}
            onChange={handleChange}
            options={Object.values(CurrencyCode).map((value) => ({
              label: value,
              value,
            }))}
          />
          <Select
            label="Odometer Unit"
            name="odoUnit"
            value={queryStates.odoUnit || ''}
            onChange={handleChange}
            options={Object.values(OdoUnit).map((value) => ({
              label: formatOdometerUnit(value),
              value,
            }))}
          />
          <Select
            label="Transmission"
            name="transmission"
            value={queryStates.transmission || ''}
            onChange={handleChange}
            options={Object.values(Transmission).map((value) => ({
              label: formatTransmission(value),
              value,
            }))}
          />
          <Select
            label="Fuel Type"
            name="fuelType"
            value={queryStates.fuelType || ''}
            onChange={handleChange}
            options={Object.values(FuelType).map((value) => ({
              label: formatFuelType(value),
              value,
            }))}
          />
          <Select
            label="Body Type"
            name="bodyType"
            value={queryStates.bodyType || ''}
            onChange={handleChange}
            options={Object.values(BodyType).map((value) => ({
              label: formatBodyType(value),
              value,
            }))}
          />
          <Select
            label="Colour"
            name="colour"
            value={queryStates.colour || ''}
            onChange={handleChange}
            options={Object.values(Colour).map((value) => ({
              label: formatColour(value),
              value,
            }))}
          />
          <Select
            label="ULEZ Compliance"
            name="ulezCompliance"
            value={queryStates.ulezCompliance || ''}
            onChange={handleChange}
            options={Object.values(ULEZCompliance).map((value) => ({
              label: formatUlezCompliance(value),
              value,
            }))}
          />

          <Select
            label="Doors"
            name="doors"
            value={queryStates.doors || ''}
            onChange={handleChange}
            options={Array.from({ length: 6 }).map((_, i) => ({
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            }))}
          />
          <Select
            label="Seats"
            name="seats"
            value={queryStates.seats || ''}
            onChange={handleChange}
            options={Array.from({ length: 8 }).map((_, i) => ({
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            }))}
          />
        </div>
      </div>
    </aside>
  );
};
