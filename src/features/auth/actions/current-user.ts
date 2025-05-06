'use server';

import { z } from 'zod';

import { checkAuth } from '@/lib/auth';
import { action } from '@/lib/safe-action';

import type { AuthResult } from '@/lib/auth';

export const getCurrentUserAction = action
  .schema(z.object({}))
  .action(async (): Promise<AuthResult> => {
    const authResult = await checkAuth();
    return authResult;
  });

export const getCurrentUser = async () => {
  const result = await checkAuth();
  if (result.success) return result.user;

  return null;
};
