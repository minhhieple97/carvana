'use client';

import { FormField } from '@/components';
import { FormControl, FormItem, FormMessage, Select } from '@/components/ui';

import { useTaxonomySelects } from '../hooks/useTaxonomySelects';

export const TaxonomySelects = () => {
  const { form, makes, models, modelVariants, handleChange } = useTaxonomySelects();
  return (
    <>
      <FormField
        control={form.control}
        name="make"
        render={({ field: { onChange, ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Make"
                selectClassName="text-form-text bg-background border-form-border focus:border-form-border-focus"
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
            <FormControl>
              <Select
                label="Model"
                selectClassName="text-form-text bg-background border-form-border focus:border-form-border-focus"
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
            <FormControl>
              <Select
                label="Model Variant"
                selectClassName="text-form-text bg-background border-form-border focus:border-form-border-focus"
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
