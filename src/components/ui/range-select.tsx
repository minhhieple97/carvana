'use client';

import type { FilterOptions } from '@/config/types';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SelectType = SelectHTMLAttributes<HTMLSelectElement> & {
  options: FilterOptions<string, number>;
  error?: string;
};

type RangeSelectProps = {
  label: string;
  minSelect: SelectType;
  maxSelect: SelectType;
  className?: string;
};

export const RangeSelect = (props: RangeSelectProps) => {
  const { label, minSelect, maxSelect, className } = props;

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-sm font-medium text-gray-700 select-none">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <select
            {...minSelect}
            className={cn(
              'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
              'appearance-none pr-10 transition-colors duration-200',
              minSelect.error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
          >
            <option value="">Min {label}</option>
            {minSelect.options.map((option) => (
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="relative">
          <select
            {...maxSelect}
            className={cn(
              'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
              'appearance-none pr-10 transition-colors duration-200',
              maxSelect.error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
          >
            <option value="">Max {label}</option>
            {maxSelect.options.map((option) => (
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      {(minSelect.error || maxSelect.error) && (
        <p className="text-sm text-red-500">{minSelect.error || maxSelect.error}</p>
      )}
    </div>
  );
};
