import { getLatestArrivals } from '@/features/classifieds';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

import { LatestArrivalsCarousel } from './latest-arrivals-carousel';

import type { Favourites } from '@/config/types';

export const LatestArrivals = async () => {
  const classifieds = await getLatestArrivals();

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId || '');
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        />
      </div>
    </section>
  );
};
