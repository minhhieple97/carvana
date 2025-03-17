import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { unstable_noStore as noStore } from 'next/cache';
import type { Favourites } from '@/config/types';

export async function getCount() {
  noStore();
  return prisma.classified.count();
}

export async function getClassifieds() {
  noStore();
  return prisma.classified.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
