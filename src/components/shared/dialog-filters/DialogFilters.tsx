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
import { Settings2 } from 'lucide-react';

import { RangeFilter, SearchInput } from '@/components/shared';
import { TaxonomyFilters } from '@/components/shared';
import { Button } from '@/components/ui';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui';
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

import { useDialogFilters } from './useDialogFilters';

import type { SidebarProps } from '@/config/types';

type DialogFiltersProps = SidebarProps & {
  count: number;
};

export const DialogFilters = (props: DialogFiltersProps) => {
  const { open, setIsOpen, filterCount, clearFilters, handleChange, queryStates } =
    useDialogFilters(props.searchParams);

  const { _min, _max } = props.minMaxValues;
  const { searchParams, count } = props;

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-gray-900">
        <div className="border-b border-gray-100 dark:border-gray-700 p-5">
          <div className="mb-5 flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Filters
            </DialogTitle>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!filterCount}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                filterCount
                  ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-50'
                  : 'cursor-not-allowed text-gray-300 dark:text-gray-500'
              )}
            >
              Clear all {filterCount ? `(${filterCount})` : null}
            </button>
          </div>
          <SearchInput
            placeholder="Search classifieds..."
            className="w-full rounded-lg border-gray-200 dark:border-input dark:bg-input dark:text-gray-50 dark:placeholder-muted-foreground shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20 dark:focus-within:border-primary/80"
          />
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

          <div className="space-y-4">
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

          <Button type="button" onClick={() => setIsOpen(false)} className="w-full mt-6">
            Show Results {count > 0 ? `(${count})` : null}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
