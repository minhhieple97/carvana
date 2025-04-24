'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { endpoints } from '@/config/endpoints';
import { api } from '@/lib/api-client';

import type { FilterOptions } from '@/config/types';

export const useTaxonomySelects = () => {
  const form = useFormContext();
  const defaultMake = form.getValues('make') || null;
  const defaultModel = form.getValues('model') || null;

  const [make, setMake] = useState<string | null>(defaultMake);
  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);

  const [model, setModel] = useState<string | null>(defaultModel);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);

  const [modelVariants, setModelVariants] = useState<FilterOptions<string, string>>([]);

  useEffect(() => {
    (async function fetchTaxonomyOptions() {
      const url = new URL(endpoints.taxonomy, window.location.href);
      if (make) url.searchParams.append('make', make);
      if (model) url.searchParams.append('model', model);

      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());

      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [make, model]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, onChange: (...event: any[]) => void) => {
    switch (e.target.name) {
      case 'make':
        setMake(e.target.value);
        break;
      case 'model':
        setModel(e.target.value);
        break;
    }

    return onChange(e);
  };

  return {
    form,
    makes,
    models,
    modelVariants,
    handleChange,
  };
};
