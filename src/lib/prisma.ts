import { PrismaClient } from '@prisma/client';

import type { Prisma } from '@prisma/client';

const getPrismaLogLevels = () => {
  if (process.env.NODE_ENV === 'development') {
    return ['query', 'error', 'warn'] as Prisma.LogLevel[];
  }

  if (process.env.DEBUG_PRISMA === 'true') {
    return ['query', 'error', 'warn', 'info'] as Prisma.LogLevel[];
  }

  return ['error'] as Prisma.LogLevel[];
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: getPrismaLogLevels(),
    errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

if (process.env.NODE_ENV !== 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}
