'use server';

import { z } from 'zod';

import { authAction } from '@/lib/safe-action';

export const getCurrentUserAction = authAction.schema(z.object({})).action(async ({ ctx }) => ({
  user: ctx.user,
}));
