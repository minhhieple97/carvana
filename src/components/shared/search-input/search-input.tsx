'use client';

import debounce from 'debounce';
import { SearchIcon, XIcon } from 'lucide-react';

import { Input } from '@/components';
import { cn } from '@/lib';

import { useSearchInput } from './useSearchInput';

function debounceFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean }
) {
  return debounce(func, wait, opts);
}

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const SearchInput = (props: SearchInputProps) => {
  const { className, ...rest } = props;

  const { q, inputRef, onChange, clearSearch } = useSearchInput();

  return (
    <form className="relative flex-1 group">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-primary" />
      <Input
        ref={inputRef}
        defaultValue={q || ''}
        className={cn(
          'pl-8 transition-all hover:border-gray-400 focus:border-primary',
          'placeholder:text-gray-400 text-gray-700',
          className
        )}
        onChange={onChange}
        type="text"
        {...rest}
      />

      {q && (
        <XIcon
          className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-600 hover:text-gray-900 
            bg-gray-100 hover:bg-gray-200 p-0.5 rounded-full cursor-pointer transition-colors"
          onClick={clearSearch}
        />
      )}
    </form>
  );
};
