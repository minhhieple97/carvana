import { hashPassword, generateSalt } from '@/lib/passwordHasher';

import type { PrismaClient } from '@prisma/client';

export async function seedAdmin(prisma: PrismaClient) {
  const salt = generateSalt();
  const password = await hashPassword('abc123', salt);
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
