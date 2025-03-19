'use client';

import type { TaxonomyFiltersProps } from '@/config/types';
import { Select } from '@/components/ui';
import { useTaxonomyFilters } from './useTaxonomyFilters';

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
        labelClassName="text-gray-900 font-semibold mb-1.5 text-[0.925rem]"
        selectClassName="hover:border-gray-300 max-h-[280px]"
        containerClassName="relative"
        optionsClassName="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
      />
      <Select
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={models}
        onChange={handleChange}
        disabled={!models.length}
        placeholder="Select model"
        labelClassName="text-gray-900 font-semibold mb-1.5 text-[0.925rem]"
        selectClassName="hover:border-gray-300"
        containerClassName="relative"
        optionsClassName="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
      />
      <Select
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={modelVariants}
        onChange={handleChange}
        disabled={!modelVariants.length}
        placeholder="Select variant"
        labelClassName="text-gray-900 font-semibold mb-1.5 text-[0.925rem]"
        selectClassName="hover:border-gray-300"
        containerClassName="relative"
        optionsClassName="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
      />
    </div>
  );
};
