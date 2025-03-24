import { parseAsString } from 'nuqs';

import { useRouter } from 'next/navigation';
import { useQueryStates } from 'nuqs';
import { ChangeEvent, useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { env } from '@/env';
import { PageProps } from '@/config/types';

export const useDialogFilters = (searchParams: Awaited<PageProps['searchParams']>) => {
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(''),
      model: parseAsString.withDefault(''),
      modelVariant: parseAsString.withDefault(''),
      minYear: parseAsString.withDefault(''),
      maxYear: parseAsString.withDefault(''),
      minPrice: parseAsString.withDefault(''),
      maxPrice: parseAsString.withDefault(''),
      minReading: parseAsString.withDefault(''),
      maxReading: parseAsString.withDefault(''),
      currency: parseAsString.withDefault(''),
      odoUnit: parseAsString.withDefault(''),
      transmission: parseAsString.withDefault(''),
      fuelType: parseAsString.withDefault(''),
      bodyType: parseAsString.withDefault(''),
      colour: parseAsString.withDefault(''),
      doors: parseAsString.withDefault(''),
      seats: parseAsString.withDefault(''),
      ulezCompliance: parseAsString.withDefault(''),
    },
    {
      shallow: false,
    }
  );

  useEffect(() => {
    const filterCount = Object.entries(searchParams as Record<string, string>).filter(
      ([key, value]) => key !== 'page' && value
    ).length;

    setFilterCount(filterCount);
  }, [searchParams]);

  const clearFilters = () => {
    const url = new URL(routes.classifieds, env.NEXT_PUBLIC_APP_URL);
    router.replace(url.toString());
    setFilterCount(0);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setQueryStates({
      [name]: value || null,
    });

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }

    router.refresh();
  };

  return { open, setIsOpen, filterCount, clearFilters, handleChange, queryStates };
};
