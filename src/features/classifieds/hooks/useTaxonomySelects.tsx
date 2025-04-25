'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { endpoints } from '@/config/endpoints';
import { api } from '@/lib/api-client';

import type { FilterOptions } from '@/config/types';

const QUERY_KEY_TAXONOMY_SELECTS = 'taxonomySelects';
const STALE_TIME_TAXONOMY_SELECT_DATA = 5 * 60 * 1000;

type TaxonomySelectData = {
  makes: FilterOptions<string, string>;
  models: FilterOptions<string, string>;
  modelVariants: FilterOptions<string, string>;
};

const defaultTaxonomySelectData: TaxonomySelectData = {
  makes: [],
  models: [],
  modelVariants: [],
};

const fetchTaxonomyOptions = async (
  make: string | null,
  model: string | null
): Promise<TaxonomySelectData> => {
  const params = new URLSearchParams();
  if (make) params.set('make', make);
  if (model) params.set('model', model);

  const queryString = params.toString();
  const url = queryString ? `${endpoints.taxonomy}?${queryString}` : endpoints.taxonomy;

  try {
    const data = await api.get<TaxonomySelectData>(url);
    return {
      makes: data.makes ?? [],
      models: data.models ?? [],
      modelVariants: data.modelVariants ?? [],
    };
  } catch (error) {
    console.error('Failed to fetch taxonomy options:', error);
    toast.error('Failed to load filter options.');
    throw new Error('Failed to fetch taxonomy options');
  }
};

export const useTaxonomySelects = () => {
  const form = useFormContext();
  const initialMake = form.getValues('make') || null;
  const initialModel = form.getValues('model') || null;

  const [selectedMake, setSelectedMake] = useState<string | null>(initialMake);
  const [selectedModel, setSelectedModel] = useState<string | null>(initialModel);

  const queryKey = [QUERY_KEY_TAXONOMY_SELECTS, selectedMake, selectedModel];

  const { data, isLoading, isError } = useQuery<TaxonomySelectData, Error>({
    queryKey: queryKey,
    queryFn: () => fetchTaxonomyOptions(selectedMake, selectedModel),
    staleTime: STALE_TIME_TAXONOMY_SELECT_DATA,
    placeholderData: defaultTaxonomySelectData,
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>, rhfOnChange: (...event: any[]) => void) => {
      const { name, value } = event.target;

      if (name === 'make') {
        setSelectedMake(value || null);
        setSelectedModel(null);
        form.setValue('model', null, { shouldValidate: true });
        form.setValue('modelVariant', null, { shouldValidate: true });
      } else if (name === 'model') {
        setSelectedModel(value || null);
        form.setValue('modelVariant', null, { shouldValidate: true });
      }

      rhfOnChange(event);
    },
    [form]
  );

  return {
    form,
    makes: data?.makes ?? defaultTaxonomySelectData.makes,
    models: data?.models ?? defaultTaxonomySelectData.models,
    modelVariants: data?.modelVariants ?? defaultTaxonomySelectData.modelVariants,
    handleChange,
    isLoading,
    isError,
  };
};
