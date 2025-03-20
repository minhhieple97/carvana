import { Suspense } from 'react';

import { CustomPagination } from '@/components/shared/';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import { ClassifiedsList, getCount } from '@/features/classifieds';
import { ClassifiedsCount } from '@/features/classifieds';
import { getFavourites, getClassifieds, getClassifiedsMinMaxValues } from '@/features/classifieds';
import { Sidebar } from '@/features/classifieds/components/sidebar';
import { getSourceId } from '@/lib/source-id';

import type { PageProps } from '@/config/types';

export default async function ClassifiedsPage(pageProps: PageProps) {
  const searchParams = await pageProps.searchParams;
  const [classifieds, sourceId, count, minMaxValues] = await Promise.all([
    getClassifieds(searchParams),
    getSourceId(),
    getCount(searchParams),
    getClassifiedsMinMaxValues(),
  ]);
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
                  <div className="flex justify-end">
                    <CustomPagination
                      baseURL={routes.classifieds}
                      totalPages={totalPages}
                      styles={{
                        paginationRoot: 'w-auto ml-auto',
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

              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                  </div>
                }
              >
                <section className="bg-white rounded-xl shadow-sm p-6">
                  <ClassifiedsList
                    classifieds={classifieds}
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
