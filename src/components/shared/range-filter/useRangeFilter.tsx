import { useEffect, useState } from 'react';

import { formatNumber, formatPrice } from '@/lib';

import type { FilterOptions, RangeFilterProps } from '@/config/types';
export const useRangeFilter = (props: RangeFilterProps) => {
  const {
    label,
    minName,
    maxName,
    defaultMin,
    defaultMax,
    increment,
    thousandSeparator,
    currency,
    handleChange,
    searchParams,
  } = props;

  const getInitialState = () => {
    const state: FilterOptions<string, number> = [];
    let iterator = defaultMin - (increment ?? 1);

    do {
      if (increment) {
        iterator = iterator + increment;
      } else {
        iterator++;
      }

      if (currency) {
        state.push({
          label: formatPrice({
            price: iterator,
            currency: currency.currencyCode,
          }),
          value: iterator,
        });
      } else if (thousandSeparator) {
        state.push({ label: formatNumber(iterator), value: iterator });
      } else {
        state.push({ label: iterator.toString(), value: iterator });
      }
    } while (iterator < defaultMax);

    return state;
  };

  const initialState = getInitialState();

  const [minOptions, setMinOptions] = useState<FilterOptions<string, number>>(initialState);
  const [maxOptions, setMaxOptions] = useState<FilterOptions<string, number>>(
    initialState.toReversed()
  );

  useEffect(() => {
    if (searchParams?.[minName]) {
      setMaxOptions(initialState.filter(({ value }) => value > Number(searchParams[minName])));
    }
    if (searchParams?.[maxName]) {
      setMinOptions(initialState.filter(({ value }) => value < Number(searchParams[maxName])));
    }
  }, [searchParams?.[minName], searchParams?.[maxName]]);
  return {
    minOptions,
    maxOptions,
    handleChange,
    label,
    minName,
    maxName,
    defaultMin,
    defaultMax,
    increment,
    thousandSeparator,
    searchParams,
    currency,
  };
};
