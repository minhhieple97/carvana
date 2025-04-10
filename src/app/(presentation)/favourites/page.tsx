import { unstable_cache as cache } from 'next/cache';
import { Suspense } from 'react';

import { CustomPagination } from '@/components/shared/cusstom-pagination';
import { InventorySkeleton } from '@/components/shared/inventory/inventory-skeleton';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import { ClassifiedCard } from '@/features/classifieds';
import {
  getFavouriteIds,
  getPaginatedFavourites,
  getTotalFavouritesCount,
} from '@/features/favourites';
import { getSourceId } from '@/lib/source-id';
import { PageSchema } from '@/schemas/page.schema';

import type { PageProps } from '@/config/types';

const getCachedFavouriteIds = cache(
  async (sourceId: string | undefined) => await getFavouriteIds(sourceId),
  ['favourite-ids'],
  { revalidate: 60 } // 60 seconds
);

const getCachedClassifieds = cache(
  async (favouriteIds: number[], page: number) => {
    if (favouriteIds.length === 0) {
      return { classifieds: [], count: 0 };
    }

    const [classifieds, count] = await Promise.all([
      getPaginatedFavourites(favouriteIds, page),
      getTotalFavouritesCount(favouriteIds),
    ]);

    return { classifieds, count };
  },
  ['favourite-classifieds'],
  { revalidate: 60 } // 60 seconds
);

// Separate component for empty state to reduce complexity
function EmptyFavouritesState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-semibold text-muted-foreground mb-2">No Favourites Found</h2>
      <p className="text-muted-foreground">
        You haven't added any vehicles to your favourites list yet.
      </p>
    </div>
  );
}

// Separate component for the classified grid to improve readability
function ClassifiedGrid({
  classifieds,
  favouriteIds,
}: {
  classifieds: any[];
  favouriteIds: number[];
}) {
  const favouritesProp = { ids: favouriteIds };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} favourites={favouritesProp} />
      ))}
    </div>
  );
}

async function FavouriteList({ searchParams }: PageProps) {
  const params = await searchParams;
  const parsedPage = PageSchema.safeParse(params?.page);
  const page = parsedPage.success ? parsedPage.data : 1;

  const sourceId = await getSourceId();
  const favouriteIds = await getCachedFavouriteIds(sourceId);

  if (favouriteIds.length === 0) {
    return <EmptyFavouritesState />;
  }

  const { classifieds, count } = await getCachedClassifieds(favouriteIds, page ?? 1);

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  if (classifieds.length === 0) {
    return <EmptyFavouritesState />;
  }

  return (
    <>
      <ClassifiedGrid classifieds={classifieds} favouriteIds={favouriteIds} />

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <CustomPagination
            baseURL={routes.favourites}
            totalPages={totalPages}
            styles={{
              paginationRoot: '',
              paginationPrevious: '',
              paginationNext: '',
              paginationLinkActive: '',
              paginationLink: 'border-none',
            }}
          />
        </div>
      )}
    </>
  );
}

export default async function FavouritesPage(props: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-10">Your Favourites</h1>

      <Suspense fallback={<InventorySkeleton count={CLASSIFIEDS_PER_PAGE} />}>
        <FavouriteList {...props} />
      </Suspense>
    </div>
  );
}
