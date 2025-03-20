'use client';

import { Select } from '@/components/ui';

import { useTaxonomyFilters } from './useTaxonomyFilters';

import type { TaxonomyFiltersProps } from '@/config/types';

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { makes, models, modelVariants, handleChange, searchParams } = useTaxonomyFilters(props);

  return (
    <div className="space-y-4">
      <Select
        label="Make"
        name="make"
        value={searchParams?.make as string}
        onChange={handleChange}
        options={makes}
        placeholder="Select make"
      />
      <Select
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={models}
        onChange={handleChange}
        disabled={!models.length}
        placeholder="Select model"
      />
      <Select
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={modelVariants}
        onChange={handleChange}
        disabled={!modelVariants.length}
        placeholder="Select variant"
      />
    </div>
  );
};
