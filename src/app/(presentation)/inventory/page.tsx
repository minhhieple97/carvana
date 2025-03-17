import { ClassifiedsList } from '@/features/classifieds';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

import type { AwaitedPageProps, Favourites } from '@/config/types';

const getInventory = async (searchParams: AwaitedPageProps['searchParams']) =>
  prisma.classified.findMany({
    include: {
      images: true,
    },
  });
export default async function InventoryPage(props: AwaitedPageProps) {
  const searchParams = props.searchParams;
  const inventory = await getInventory(searchParams);
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? '');
  return (
    <ClassifiedsList classifieds={inventory} favourites={favourites ? favourites : { ids: [] }} />
  );
}
