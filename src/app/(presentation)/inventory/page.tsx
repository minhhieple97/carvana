import { ClassifiedsList } from '@/features/classifieds';
import { AwaitedPageProps, Favourites } from '@/config/types';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

const getInventory = async (searchParams: AwaitedPageProps['searchParams']) => {
  return prisma.classified.findMany({
    include: {
      images: true,
    },
  });
};
export default async function InventoryPage(props: AwaitedPageProps) {
  const searchParams = props.searchParams;
  const inventory = await getInventory(searchParams);
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? '');
  return (
    <ClassifiedsList classifieds={inventory} favourites={favourites ? favourites : { ids: [] }} />
  );
}
