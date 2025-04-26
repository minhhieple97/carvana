'use client';

import { cn } from '@/lib/utils';

import type { FilterOptions } from '@/config/types';
import type { SelectHTMLAttributes } from 'react';

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
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <select
            {...minSelect}
            className={cn(
              'w-full rounded-md border border-input bg-transparent px-4 py-2.5 text-sm',
              'text-foreground font-medium',
              'appearance-none pr-10 transition-colors duration-200',
              'disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground',
              'hover:border-input/80 dark:hover:border-input/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <option value="" className="text-foreground font-medium py-2.5 bg-background">
              Min {label}
            </option>
            {minSelect.options.map((option) => (
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
                minSelect.disabled ? 'text-gray-400' : 'text-gray-600'
              )}
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
              'w-full rounded-md border border-input bg-transparent px-4 py-2.5 text-sm',
              'text-foreground font-medium',
              'appearance-none pr-10 transition-colors duration-200',
              'disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground',
              'hover:border-input/80 dark:hover:border-input/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <option value="" className="text-foreground font-medium py-2.5 bg-background">
              Max {label}
            </option>
            {maxSelect.options.map((option) => (
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
                maxSelect.disabled ? 'text-gray-400' : 'text-gray-600'
              )}
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
        <p className="text-sm font-medium text-red-600">{minSelect.error || maxSelect.error}</p>
      )}
    </div>
  );
};
