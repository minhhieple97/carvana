import { cn } from '@/lib/utils';
import type { ChangeEvent, SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
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
    noDefault = true,
    error,
    disabled,
    placeholder,
    ...rest
  } = props;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-700 select-none">{label}</label>}
      <div className="relative">
        <select
          onChange={onChange}
          value={value ?? ''}
          disabled={disabled}
          className={cn(
            'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            'appearance-none pr-10 transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            selectClassName
          )}
          {...rest}
        >
          {noDefault && <option value="">{placeholder || `Select ${label?.toLowerCase()}`}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
