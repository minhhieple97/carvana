import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { createUser, verifyUserCredentials } from '../db/auth';

import type { SignUpInput, SignInInput } from '../types';

export const signUp = async ({ email, password }: SignUpInput) => {
  try {
    const user = await createUser({ email, password, role: Role.user });
    return { user };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      typeof error.meta?.target === 'string' &&
      error.meta.target.includes('email')
    ) {
      return { error: 'Email already in use' };
    }

    return { error: 'Failed to create user' };
  }
};

export const signIn = async ({ email, password }: SignInInput) => {
  try {
    const user = await verifyUserCredentials({ email, password });

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    return { success: true, user };
  } catch {
    return { success: false, error: 'Authentication failed' };
  }
};
