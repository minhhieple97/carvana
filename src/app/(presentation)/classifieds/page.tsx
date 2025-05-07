import { Suspense } from 'react';

import { DialogFilters } from '@/components';
import { InventorySkeleton } from '@/components/shared/inventory';
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
import { CustomPaginationWithSuspense } from '@/components/shared';

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar searchParams={searchParams} minMaxValues={minMaxValues} />
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Suspense
                      fallback={<div className="h-6 w-48 animate-pulse bg-muted rounded" />}
                    >
                      <ClassifiedsCount count={count} />
                    </Suspense>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <DialogFilters
                      minMaxValues={minMaxValues}
                      count={count}
                      searchParams={searchParams}
                    />
                    {totalPages > 1 && (
                      <CustomPaginationWithSuspense
                        baseURL={routes.classifieds}
                        totalPages={totalPages}
                      />
                    )}
                  </div>
                </div>
              </header>

              <Suspense fallback={<InventorySkeleton />}>
                <section className="bg-card text-card-foreground border border-border rounded-xl shadow-sm p-4 sm:p-6">
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
