import { redis } from '@/lib/redis-store';

import type { Favourites } from '@/config/types';

export const getFavouriteIds = async (sourceId: string | undefined): Promise<number[]> => {
  if (!sourceId) {
    return [];
  }
  const favourites = await redis.get<Favourites>(sourceId);
  return favourites?.ids ?? [];
};
