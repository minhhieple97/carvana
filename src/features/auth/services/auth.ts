import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ActionError } from '@/lib/safe-action';

import { createUser, verifyUserCredentials } from '../db/auth';

import type { SignUpInput, SignInInput } from '../types';

export const signUp = async ({ email, password }: SignUpInput) => {
  try {
    const user = await createUser({ email, password, role: Role.user });
    return user;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      typeof error.meta?.target === 'string' &&
      error.meta.target.includes('email')
    ) {
      throw new ActionError('Email already in use');
    }

    throw new ActionError('Failed to create user');
  }
};

export const signIn = async ({ email, password }: SignInInput) => {
  try {
    const user = await verifyUserCredentials({ email, password });

    if (!user) {
      throw new ActionError('Invalid credentials');
    }
    return user;
  } catch {
    throw new ActionError('Authentication failed');
  }
};
