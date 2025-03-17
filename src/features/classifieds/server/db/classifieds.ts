import { AwaitedPageProps } from '@/config/types';
import { PageSchema } from '@/app/schemas/page.schema';
import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';

export const getCount = async (searchParams: AwaitedPageProps['searchParams']) => {
  noStore();
  return prisma.classified.count();
};

export const getClassifieds = async (searchParams: AwaitedPageProps['searchParams']) => {
  noStore();
  const validPage = PageSchema.parse(searchParams.page);
  const page = validPage ? validPage : 1;

  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};
