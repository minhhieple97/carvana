import type { Params } from 'next/dist/server/request/params';
import type { SearchParams } from 'next/dist/server/request/search-params';

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export type AwaitedPageProps = {
  params: Awaited<PageProps['params']>;
  searchParams: Awaited<PageProps['searchParams']>;
};

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export interface Favourites {
  ids: number[];
}
