import { unstable_noStore as noStore } from 'next/cache';

import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { prisma } from '@/lib/prisma';

import type { ClassifiedWithImages } from '@/features/classifieds';

type GetFavouriteClassifiedsParams = {
  favouriteIds: number[];
  page: number;
  limit?: number;
};

export const getPaginatedFavouriteClassifieds = async ({
  favouriteIds,
  page,
  limit = CLASSIFIEDS_PER_PAGE,
}: GetFavouriteClassifiedsParams): Promise<ClassifiedWithImages[]> => {
  noStore();
  if (favouriteIds.length === 0) {
    return [];
  }

  const offset = (page - 1) * limit;
  return prisma.classified.findMany({
    where: { id: { in: favouriteIds } },
    include: { images: { take: 1 } },
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
};

export const getFavouritesCount = async (favouriteIds: number[]): Promise<number> => {
  noStore();
  if (favouriteIds.length === 0) {
    return 0;
  }

  return prisma.classified.count({
    where: { id: { in: favouriteIds } },
  });
};
