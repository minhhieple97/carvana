import { unstable_noStore as noStore } from 'next/cache';

import { PageSchema } from '@/app/schemas';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { prisma } from '@/lib/prisma';

import { buildClassifiedFilterQuery } from '../services';

import type { AwaitedPageProps } from '@/config/types';
import { ClassifiedStatus } from '@prisma/client';

export const getCount = async (searchParams: AwaitedPageProps['searchParams']) => {
  noStore();
  const query = buildClassifiedFilterQuery(searchParams);
  return prisma.classified.count({ where: query });
};

export const getClassifieds = async (searchParams: AwaitedPageProps['searchParams']) => {
  noStore();
  const validPage = PageSchema.parse(searchParams?.page);

  const page = validPage ? validPage : 1;

  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  const query = buildClassifiedFilterQuery(searchParams);
  return prisma.classified.findMany({
    where: query,
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};
export const getClassifiedsMinMaxValues = async () =>
  prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  });
