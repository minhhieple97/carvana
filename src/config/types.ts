import { Params } from 'next/dist/server/request/params';
import { SearchParams } from 'next/dist/server/request/search-params';

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export type AwaitedPageProps = {
  params: Awaited<PageProps['params']>;
  searchParams: Awaited<PageProps['searchParams']>;
};
