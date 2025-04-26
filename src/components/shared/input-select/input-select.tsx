'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components';
import { NumberInput } from '@/components/shared';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import type { FilterOptions } from '@/config/types';
import type { NumericFormatProps } from 'react-number-format';

type InputSelectProps = NumericFormatProps & {
  inputName: string;
  selectName: string;
  label?: string;
  options: FilterOptions<string, string>;
  prefix?: string;
  className?: string;
};

export const InputSelect = (props: InputSelectProps) => {
  const { inputName, selectName, label, options, prefix, className, ...numberInputProps } = props;

  const form = useFormContext();

  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name={inputName}
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            {label && (
              <FormLabel
                htmlFor={inputName}
                className="font-semibold mb-1.5 text-[0.925rem] text-foreground"
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex w-full">
                <div className="w-[70%]">
                  <NumberInput
                    className="w-full rounded-r-none border-r-0 focus-visible:z-10"
                    onValueChange={(values) => {
                      onChange(values.floatValue);
                    }}
                    {...rest}
                    {...numberInputProps}
                  />
                </div>
                <div className="w-[30%]">
                  <FormField
                    control={form.control}
                    name={selectName}
                    render={({ field }) => (
                      <div className="h-full">
                        <select
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          className={cn(
                            'h-full w-full rounded-l-none border border-input bg-background px-4 py-2.5 text-sm',
                            'text-foreground font-medium transition-colors duration-200'
                          )}
                        >
                          {options.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="text-foreground font-medium py-2.5 bg-background"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
