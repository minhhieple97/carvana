'use client';

import type { FilterOptions } from '@/config/types';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import type { NumericFormatProps } from 'react-number-format';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components';
import { NumberInput } from '@/components/shared';

type InputSelectProps = NumericFormatProps & {
  inputName: string;
  selectName: string;
  label?: string;
  options: FilterOptions<string, string>;
  prefix?: string;
};

export const InputSelect = (props: InputSelectProps) => {
  const { inputName, selectName, label, options, prefix, ...numberInputProps } = props;

  const form = useFormContext();

  return (
    <div className="w-full relative">
      <FormField
        control={form.control}
        name={inputName}
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            {label && (
              <FormLabel htmlFor={inputName} className="text-form-label-color">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <NumberInput
                className="text-form-text bg-form-bg border-form-border h-form-input-height rounded-form-radius placeholder:text-form-placeholder focus:border-form-border-focus hover:border-form-border-focus transition-colors"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
                {...numberInputProps}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={selectName}
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <div className="absolute right-0 -translate-y-10 h-form-input-height flex items-center border-l border-l-form-border">
                <select
                  className={cn(
                    'custom-select appearance-none pr-10 h-full bg-no-repeat bg-form-bg text-form-text border-transparent rounded-r-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors'
                  )}
                  {...rest}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </FormControl>
            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};
