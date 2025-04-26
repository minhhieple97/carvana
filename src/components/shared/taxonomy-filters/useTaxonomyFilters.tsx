import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { endpoints } from '@/config';
import { api } from '@/lib/api-client';

import type { FilterOptions, TaxonomyFiltersProps } from '@/config';

const QUERY_KEY_TAXONOMY = 'taxonomy';
const STALE_TIME_TAXONOMY_DATA = 5 * 60 * 1000;

type TaxonomyData = {
  makes: FilterOptions<string, string>;
  models: FilterOptions<string, string>;
  modelVariants: FilterOptions<string, string>;
};

const defaultTaxonomyData: TaxonomyData = {
  makes: [],
  models: [],
  modelVariants: [],
};

const createStableSearchParams = (
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string | string[]> => {
  const stableParams: Record<string, string | string[]> = {};
  Object.keys(searchParams)
    .sort()
    .forEach((key) => {
      const value = searchParams[key];
      if (value !== undefined && value !== null && value !== '') {
        stableParams[key] = value;
      }
    });
  return stableParams;
};

const fetchTaxonomyData = async (
  searchParams: Record<string, string | string[]>
): Promise<TaxonomyData> => {
  const params = new URLSearchParams();

  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  }

  const queryString = params.toString();
  const url = queryString ? `${endpoints.taxonomy}?${queryString}` : endpoints.taxonomy;

  try {
    const data = await api.get<TaxonomyData>(url);

    return {
      makes: data.makes ?? [],
      models: data.models ?? [],
      modelVariants: data.modelVariants ?? [],
    };
  } catch (error) {
    console.error('Failed to fetch taxonomy data:', error);

    throw new Error('Failed to fetch taxonomy data');
  }
};

export const useTaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;

  const currentSearchParams = searchParams ?? {};

  const stableSearchParams = useMemo(
    () => createStableSearchParams(currentSearchParams),
    [currentSearchParams]
  );

  const queryKey = [QUERY_KEY_TAXONOMY, stableSearchParams];

  const { data, isLoading, isError, error } = useQuery<TaxonomyData, Error>({
    queryKey: queryKey,
    queryFn: () => fetchTaxonomyData(stableSearchParams),
    staleTime: STALE_TIME_TAXONOMY_DATA,
    placeholderData: defaultTaxonomyData,
  });

  if (isError) {
    console.error('Error fetching taxonomy data via useQuery:', error);
    toast.error('Error fetching taxonomy data');
  }

  return {
    makes: data?.makes ?? defaultTaxonomyData.makes,
    models: data?.models ?? defaultTaxonomyData.models,
    modelVariants: data?.modelVariants ?? defaultTaxonomyData.modelVariants,
    handleChange,
    searchParams,
    isLoading,
    isError,
  };
};
