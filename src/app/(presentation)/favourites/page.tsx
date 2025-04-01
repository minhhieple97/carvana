import { Suspense } from 'react';

import { PageSchema } from '@/app/schemas/page.schema';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import type { PageProps } from '@/config/types';
import { getSourceId } from '@/lib/source-id';
import ClassifiedCard from '@/features/classifieds/classified-card';
import {
  getFavouriteIds,
  getPaginatedFavouriteClassifieds,
  getFavouritesCount,
} from '@/features/favourites';

import { InventorySkeleton } from '@/components/shared/inventory/inventory-skeleton';
import { CustomPagination } from '@/components/shared/cusstom-pagination';

async function FavouriteList({ searchParams }: PageProps) {
  const params = await searchParams;
  const parsedPage = PageSchema.safeParse(params?.page);
  const page = parsedPage.success ? parsedPage.data : 1;

  const sourceId = await getSourceId();
  const favouriteIds = await getFavouriteIds(sourceId);

  const [classifieds, count] = await Promise.all([
    getPaginatedFavouriteClassifieds({ favouriteIds, page: page ?? 1 }),
    getFavouritesCount(favouriteIds),
  ]);

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);
  const favouritesProp = { ids: favouriteIds };

  if (classifieds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-2">No Favourites Found</h2>
        <p className="text-muted-foreground">
          You haven't added any vehicles to your favourites list yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {classifieds.map((classified) => (
          <ClassifiedCard key={classified.id} classified={classified} favourites={favouritesProp} />
        ))}
      </div>

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
