import { cn } from '@/lib/utils';

import type { ChangeEvent, SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  optionsClassName?: string;
  noDefault?: boolean;
  error?: string;
  placeholder?: string;
};

export const Select = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    labelClassName,
    containerClassName,
    optionsClassName,
    noDefault = true,
    error,
    disabled,
    placeholder,
    ...rest
  } = props;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label
          className={cn('font-semibold mb-1.5 text-[0.925rem] text-foreground', labelClassName)}
        >
          {label}
        </label>
      )}
      <div className={cn('relative', containerClassName)}>
        <select
          onChange={onChange}
          value={value ?? ''}
          disabled={disabled}
          className={cn(
            'w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm',
            'disabled:■-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground',
            'appearance-none pr-10 transition-all duration-200',
            'text-foreground font-medium',
            'hover:border-input-border',
            error &&
              'border-destructive focus:border-destructive focus:ring-destructive/20 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent max-h-[280px] overflow-y-auto',
            selectClassName
          )}
          {...rest}
        >
          {noDefault && (
            <option value="" className="text-muted-foreground font-normal dark:text-gray-300">
              {placeholder || `Select ${label?.toLowerCase()}`}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={cn(
                'text-foreground font-medium py-1.5 dark:text-gray-200',
                optionsClassName
              )}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className={cn(
              'h-4 w-4 transition-colors',
              disabled ? 'text-muted-foreground' : 'text-foreground/60'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
