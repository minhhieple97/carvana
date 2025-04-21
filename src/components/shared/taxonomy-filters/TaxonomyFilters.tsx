'use client';

import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui';

import { useTaxonomyFilters } from './useTaxonomyFilters';

import type { TaxonomyFiltersProps } from '@/config/types';

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { makes, models, modelVariants, handleChange, searchParams } = useTaxonomyFilters(props);

  return (
    <>
      <div>
        <Label htmlFor="make" className="filter-label">
          Make
        </Label>
        <Select
          id="make"
          name="make"
          value={searchParams?.make as string}
          onChange={handleChange}
          options={makes}
          placeholder="Select make"
        />
      </div>
      <div>
        <Label htmlFor="model" className="filter-label">
          Model
        </Label>
        <Select
          id="model"
          name="model"
          value={searchParams?.model as string}
          options={models}
          onChange={handleChange}
          disabled={!models.length}
          placeholder="Select model"
        />
      </div>
      <div>
        <Label htmlFor="modelVariant" className="filter-label">
          Model Variant
        </Label>
        <Select
          id="modelVariant"
          name="modelVariant"
          value={searchParams?.modelVariant as string}
          options={modelVariants}
          onChange={handleChange}
          disabled={!modelVariants.length}
          placeholder="Select variant"
        />
      </div>
    </>
  );
};
