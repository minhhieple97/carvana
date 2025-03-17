import { redis } from '@/lib/redis-store';
import type { Favourites } from '@/config/types';

export async function getFavourites(sourceId: string | undefined) {
  if (!sourceId) return { ids: [] };
  return (await redis.get<Favourites>(sourceId)) ?? { ids: [] };
}
