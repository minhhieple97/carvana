'use client';
import { RangeSelect } from '@/components/ui';

import { useRangeFilter } from './useRangeFilter';

import type { RangeFilterProps } from '@/config/types';
export const RangeFilter = (props: RangeFilterProps) => {
  const { label, minName, maxName, searchParams, handleChange, minOptions, maxOptions } =
    useRangeFilter(props);
  return (
    <RangeSelect
      label={label}
      minSelect={{
        name: minName,
        value: Number(searchParams?.[minName]) || '',
        onChange: handleChange,
        options: minOptions,
      }}
      maxSelect={{
        name: maxName,
        value: Number(searchParams?.[maxName]) || '',
        onChange: handleChange,
        options: maxOptions,
      }}
    />
  );
};
