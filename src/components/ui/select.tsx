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
      <div className={cn('relative')}>
        <select
          onChange={onChange}
          value={value ?? ''}
          disabled={disabled}
          className={cn(
            'w-full rounded-md border border-input bg-transparent px-4 py-2.5 text-sm',
            'text-foreground font-medium',
            'appearance-none pr-10 transition-colors duration-200',
            'disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground',
            'hover:border-input/80 dark:hover:border-input/80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            selectClassName
          )}
          {...rest}
        >
          {noDefault && (
            <option value="" className="text-foreground font-medium py-2.5 bg-background">
              {placeholder || `Select ${label?.toLowerCase()}`}
            </option>
          )}
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
      {error && <p className="text-sm font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
};
