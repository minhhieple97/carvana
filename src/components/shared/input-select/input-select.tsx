'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components';
import { NumberInput } from '@/components/shared';
import { cn } from '@/lib/utils';

import type { FilterOptions } from '@/config/types';
import type { NumericFormatProps } from 'react-number-format';

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
              <div className="flex items-center">
                <NumberInput
                  className="text-form-text bg-form-bg border-form-border h-10 rounded-l-form-radius rounded-r-none placeholder:text-form-placeholder focus:border-form-border-focus hover:border-form-border-focus transition-colors flex-grow"
                  onValueChange={(values) => {
                    onChange(values.floatValue);
                  }}
                  {...rest}
                  {...numberInputProps}
                />
                <FormField
                  control={form.control}
                  name={selectName}
                  render={({ field: { ref, ...rest } }) => (
                    <select
                      className={cn(
                        'custom-select appearance-none px-3 h-10 bg-no-repeat bg-form-bg text-form-text border border-form-border rounded-r-form-radius rounded-l-none border-l-0 focus:border-form-border-focus hover:border-form-border-focus transition-colors min-w-[100px] text-center mt-1'
                      )}
                      {...rest}
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
