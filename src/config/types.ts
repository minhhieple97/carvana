import type { CurrencyCode, Prisma } from '@prisma/client';
import type { SearchParams } from 'next/dist/server/request/search-params';
import type { ChangeEvent } from 'react';

type Params = {
  [x: string]: string | string[];
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps['params']>;
  searchParams?: Awaited<PageProps['searchParams']>;
};

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export type Favourites = {
  ids: number[];
};

export type SidebarProps = AwaitedPageProps & {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: {
      year: true;
      price: true;
      odoReading: true;
    };
    _max: {
      year: true;
      odoReading: true;
      price: true;
    };
  }>;
};

export type TaxonomyFiltersProps = AwaitedPageProps & {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type FilterOptions<LType, VType> = Array<{
  label: LType;
  value: VType;
}>;

export type RangeFilterProps = TaxonomyFiltersProps & {
  label: string;
  minName: string;
  maxName: string;
  defaultMin: number;
  defaultMax: number;
  increment?: number;
  thousandSeparator?: boolean;
  currency?: {
    currencyCode: CurrencyCode;
  };
};

export type PaginationProps = {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
};

export type PrevState = {
  success: boolean;
  message: string;
};
