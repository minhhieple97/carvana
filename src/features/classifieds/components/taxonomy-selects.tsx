'use client';

import { FormLabel, FormControl, FormItem, FormMessage, Select } from '@/components/ui';
import { FormField } from '@/components';
import { endpoints } from '@/config/endpoints';
import type { FilterOptions } from '@/config/types';
import { api } from '@/lib/api-client';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const TaxonomySelects = () => {
  const form = useFormContext();
  const defaultMake = form.getValues('make') || null;
  const defaultModel = form.getValues('model') || null;

  const [make, setMake] = useState<string | null>(defaultMake);
  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);

  const [model, setModel] = useState<string | null>(defaultModel);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);

  const [modelVariants, setModelVariants] = useState<FilterOptions<string, string>>([]);

  useEffect(() => {
    (async function fetchMakeOptions() {
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

  return (
    <>
      <FormField
        control={form.control}
        name="make"
        render={({ field: { onChange, ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="make">Make</FormLabel>
            <FormControl>
              <Select
                selectClassName="text-white/90 bg-primary-900 border-primary-700 focus:border-primary-600"
                options={makes}
                onChange={(e) => handleChange(e, onChange)}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="model"
        render={({ field: { onChange, ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="model">Model</FormLabel>
            <FormControl>
              <Select
                selectClassName="text-white/90 bg-primary-900 border-primary-700 focus:border-primary-600"
                options={models}
                onChange={(e) => handleChange(e, onChange)}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="modelVariant"
        render={({ field: { onChange, ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="modelVariant">Model Variant</FormLabel>
            <FormControl>
              <Select
                selectClassName="text-white/90 bg-primary-900 border-primary-700 focus:border-primary-600"
                options={modelVariants}
                onChange={(e) => handleChange(e, onChange)}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
