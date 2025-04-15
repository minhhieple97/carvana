import { Role } from '@prisma/client';

import { ActionError } from '@/lib/safe-action';

import { createUser, verifyUserCredentials } from '../db/auth';

import type { SignUpInput, SignInInput } from '../types';

export const signUp = async ({ email, password }: SignUpInput) => {
  try {
    const user = await createUser({ email, password, role: Role.user });
    return user;
  } catch {
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
