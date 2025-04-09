import { bcryptPasswordHash } from '@/lib/bcrypt';

import type { PrismaClient } from '@prisma/client';

export async function seedAdmin(prisma: PrismaClient) {
  const password = await bcryptPasswordHash('abc123');
  const salt = '123456';
  const admin = await prisma.user.create({
    data: {
      email: 'admin@carvana.com',
      password,
      salt,
      role: 'admin',
    },
  });

  return admin;
}
