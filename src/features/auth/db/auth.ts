import { hashPassword, comparePasswords, generateSalt } from '@/lib/passwordHasher';
import { prisma } from '@/lib/prisma';

import type { CreateUserData, SignInData } from '../types';

export const createUser = async ({ email, password, role = 'user' }: CreateUserData) => {
  const salt = generateSalt();

  const hashedPassword = await hashPassword(password, salt);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      salt,
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      salt: true,
      role: true,
    },
  });

export const verifyUserCredentials = async ({ email, password }: SignInData) => {
  const user = await findUserByEmail(email);

  if (!user || !user.salt || !user.password) {
    return null;
  }

  const isPasswordValid = await comparePasswords({
    password,
    salt: user.salt,
    hashedPassword: user.password,
  });

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export const getUserById = async (id: string) =>
  prisma.user.findUnique({
    where: { id },
  });
