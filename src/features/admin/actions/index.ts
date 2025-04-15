'use server';

import { ActionError } from '@/lib/safe-action';
import { authAction } from '@/lib/safe-action';

export const deleteUser = authAction.use(async ({ next, ctx }) => {
  const userRole = ctx.user.role;

  if (userRole !== 'admin') {
    throw new ActionError('Only admins can delete users.');
  }

  return next();
});
