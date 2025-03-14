import { ClassifiedsList } from '@/components/classified';
import { AwaitedPageProps } from '@/config/types';
import { prisma } from '@/lib/prisma';

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
  return <ClassifiedsList classifieds={inventory} />;
}
