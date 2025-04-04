'server-only';
import { ClassifiedStatus } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

import { PageSchema } from '@/app/schemas';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { prisma } from '@/lib/prisma';

import { buildClassifiedFilterQuery } from '../services';

import type { AwaitedPageProps } from '@/config/types';

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

export const getSingleClassified = async (slug: string) =>
  prisma.classified.findUnique({
    where: { slug },
    include: { images: true, make: true },
  });

export const getLatestArrivals = async () => {
  noStore();
  return prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });
};

export const getBrands = () =>
  prisma.make.findMany({
    where: {
      name: {
        in: [
          'Rolls-Royce',
          'Aston Martin',
          'Porsche',
          'Lamborghini',
          'Audi',
          'Jaguar',
          'Land Rover',
          'Mercedes-Benz',
          'Ferrari',
          'Bentley',
          'McLaren',
          'Ford',
          'Volkswagen',
          'Maserati',
          'Lexus',
        ],
        mode: 'insensitive',
      },
    },
  });

export const getBrandsCount = async () =>
  prisma.classified.count({
    where: { status: ClassifiedStatus.LIVE },
  });
