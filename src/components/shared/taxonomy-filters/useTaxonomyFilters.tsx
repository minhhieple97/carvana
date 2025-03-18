import { endpoints } from '@/config/endpoints';
import type { FilterOptions, TaxonomyFiltersProps } from '@/config/types';
import { api } from '@/lib/api-client';
import { useEffect, useState } from 'react';

export const useTaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;

  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);
  const [modelVariants, setModelVariants] = useState<FilterOptions<string, string>>([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(searchParams as Record<string, string>)) {
        if (v) params.set(k, v as string);
      }

      const url = new URL(endpoints.taxonomy, window.location.href);

      url.search = params.toString();

      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());

      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [searchParams]);
  return {
    makes,
    models,
    modelVariants,
    handleChange,
    searchParams,
  };
};
