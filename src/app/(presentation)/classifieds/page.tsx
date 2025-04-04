import { Suspense } from 'react';

import { CustomPagination, DialogFilters } from '@/components';
import { CLASSIFIEDS_PER_PAGE, routes } from '@/config';
import {
  getFavourites,
  getClassifieds,
  getClassifiedsMinMaxValues,
  Sidebar,
  ClassifiedsCount,
  ClassifiedsList,
  getClassifiedsCount,
} from '@/features/classifieds';
import { getSourceId } from '@/lib/source-id';

import type { PageProps } from '@/config';
import { InventorySkeleton } from '@/components/shared/inventory';

export default async function ClassifiedsPage(pageProps: PageProps) {
  const searchParams = await pageProps.searchParams;
  const classifiedsPromise = getClassifieds(searchParams);
  const [sourceId, count, minMaxValues] = await Promise.all([
    getSourceId(),
    getClassifiedsCount(searchParams),
    getClassifiedsMinMaxValues(),
  ]);
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex gap-6">
          <Sidebar searchParams={searchParams} minMaxValues={minMaxValues} />
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Suspense
                      fallback={<div className="h-6 w-48 animate-pulse bg-gray-200 rounded" />}
                    >
                      <ClassifiedsCount count={count} />
                    </Suspense>
                  </div>
                  <div className="flex items-center gap-4">
                    <DialogFilters
                      minMaxValues={minMaxValues}
                      count={count}
                      searchParams={searchParams}
                    />
                    <CustomPagination
                      baseURL={routes.classifieds}
                      totalPages={totalPages}
                      styles={{
                        paginationRoot: 'w-auto',
                        paginationLink:
                          'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 font-medium transition-colors',
                        paginationLinkActive:
                          'bg-primary/90 text-white hover:bg-primary hover:text-white font-semibold shadow-sm',
                        paginationPrevious:
                          'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 font-medium transition-colors',
                        paginationNext:
                          'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 font-medium transition-colors',
                      }}
                    />
                  </div>
                </div>
              </header>

              <Suspense fallback={<InventorySkeleton />}>
                <section className="bg-white rounded-xl shadow-sm p-6">
                  <ClassifiedsList
                    classifiedsPromise={classifiedsPromise}
                    favourites={await getFavourites(sourceId)}
                  />
                </section>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
