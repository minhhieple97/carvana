'server-only';
import { ClassifiedStatus, CustomerStatus } from '@prisma/client';

import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { prisma } from '@/lib/prisma';

import type { Prisma } from '@prisma/client';

export const getClassifiedCount = (query: Prisma.ClassifiedWhereInput) =>
  prisma.classified.count({ where: query });

export const getClassifieds = (query: Prisma.ClassifiedWhereInput, page: number) => {
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    where: query,
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

export const getClassifiedsMinMaxValues = () =>
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

export const getSingleClassified = (slug: string) =>
  prisma.classified.findUnique({
    where: { slug },
    include: { images: true, make: true },
  });

export const getLatestArrivals = () =>
  prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

export const getFeaturedBrands = () =>
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

export const getLiveClassifiedsCount = (condition: Prisma.ClassifiedWhereInput) =>
  prisma.classified.count({
    where: { ...condition },
  });

export const getSubscriber = (email: string) =>
  prisma.customer.findFirst({
    where: { email },
  });

export const createSubscriber = (customer: Prisma.CustomerCreateInput) =>
  prisma.customer.create({
    data: { ...customer, status: CustomerStatus.SUBSCRIBER },
  });
