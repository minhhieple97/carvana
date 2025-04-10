import { unstable_noStore as noStore } from 'next/cache';

import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { redis } from '@/lib/redis-store';

import { getPaginatedFavouriteClassifieds, getFavouritesCount } from '../db/favourites';

import type { Favourites } from '@/config/types';
import type { ClassifiedWithImages } from '@/features/classifieds';

export const getFavouriteIds = async (sourceId: string | undefined): Promise<number[]> => {
  if (!sourceId) {
    return [];
  }
  const favourites = await redis.get<Favourites>(sourceId);
  return favourites?.ids ?? [];
};

export const getPaginatedFavourites = async (
  favouriteIds: number[],
  page: number,
  limit = CLASSIFIEDS_PER_PAGE
): Promise<ClassifiedWithImages[]> => {
  if (favouriteIds.length === 0) {
    return [];
  }

  const offset = (page - 1) * limit;
  return getPaginatedFavouriteClassifieds({ favouriteIds, limit, offset });
};

export const getTotalFavouritesCount = async (favouriteIds: number[]): Promise<number> => {
  noStore();
  if (favouriteIds.length === 0) {
    return 0;
  }
  return getFavouritesCount(favouriteIds);
};
