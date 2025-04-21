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
        <label className={cn('text-gray-900 font-semibold mb-1.5 text-[0.925rem]', labelClassName)}>
          {label}
        </label>
      )}
      <div className={cn('relative', containerClassName)}>
        <select
          onChange={onChange}
          value={value ?? ''}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm',
            'focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:bg-gray-50/50 disabled:text-gray-400',
            'appearance-none pr-10 transition-all duration-200',
            'text-gray-900 font-medium',
            'hover:border-gray-300',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/20 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent',
            selectClassName
          )}
          {...rest}
        >
          {noDefault && (
            <option value="" className="text-gray-500 font-normal">
              {placeholder || `Select ${label?.toLowerCase()}`}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={cn('text-gray-900 font-medium py-1.5', optionsClassName)}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className={cn(
              'h-4 w-4 transition-colors',
              disabled ? 'text-gray-400' : 'text-gray-600'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
};
