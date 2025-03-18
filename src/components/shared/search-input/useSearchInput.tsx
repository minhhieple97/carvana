import { useRef } from 'react';

import { useCallback } from 'react';
import debounce from 'debounce';
import { useQueryState } from 'nuqs';
import { ChangeEvent } from 'react';
function debounceFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean }
) {
  return debounce(func, wait, opts);
}

export const useSearchInput = () => {
  const [q, setSearch] = useQueryState('q', { shallow: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    debounceFunc(
      (value: string) => {
        setSearch(value || null);
      },
      1000,
      { immediate: false }
    ),
    []
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    handleSearch(newValue);
  };

  const clearSearch = () => {
    setSearch(null);
    if (inputRef.current) inputRef.current.value = '';
  };
  return {
    q,
    inputRef,
    onChange,
    clearSearch,
  };
};
