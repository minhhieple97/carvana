import { prisma } from '@/lib/prisma';

import type { ClassifiedWithImages } from '@/features/classifieds';

type GetFavouriteClassifiedsParams = {
  favouriteIds: number[];
  limit: number;
  offset: number;
};

export const getPaginatedFavouriteClassifieds = async ({
  favouriteIds,
  limit,
  offset,
}: GetFavouriteClassifiedsParams): Promise<ClassifiedWithImages[]> =>
  prisma.classified.findMany({
    where: { id: { in: favouriteIds } },
    include: { images: { take: 1 } },
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

export const getFavouritesCount = async (favouriteIds: number[]): Promise<number> =>
  prisma.classified.count({
    where: { id: { in: favouriteIds } },
  });
