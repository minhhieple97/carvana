import { parseAsString, useQueryStates } from 'nuqs';
import { useCallback } from 'react';

type FilterState = {
  make: string;
  model: string;
  modelVariant: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
};

type UseHomepageFiltersProps = {
  initialState?: Partial<FilterState>;
};

export function useHomepageFilters({ initialState = {} }: UseHomepageFiltersProps = {}) {
  const [filterState, setFilterState] = useQueryStates(
    {
      make: parseAsString.withDefault(initialState.make || ''),
      model: parseAsString.withDefault(initialState.model || ''),
      modelVariant: parseAsString.withDefault(initialState.modelVariant || ''),
      minYear: parseAsString.withDefault(initialState.minYear || ''),
      maxYear: parseAsString.withDefault(initialState.maxYear || ''),
      minPrice: parseAsString.withDefault(initialState.minPrice || ''),
      maxPrice: parseAsString.withDefault(initialState.maxPrice || ''),
    },
    { shallow: false }
  );

  const handleFilterChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case 'make':
          await setFilterState({ make: value, model: null, modelVariant: null });
          break;
        case 'model':
          await setFilterState({ model: value, modelVariant: null });
          break;
        default:
          await setFilterState({ [name]: value });
      }
    },
    [setFilterState]
  );

  const resetFilters = useCallback(async () => {
    await setFilterState({
      make: null,
      model: null,
      modelVariant: null,
      minYear: null,
      maxYear: null,
      minPrice: null,
      maxPrice: null,
    });
  }, [setFilterState]);

  return {
    filters: filterState,
    handleFilterChange,
    resetFilters,
    setFilters: setFilterState,
  };
}
