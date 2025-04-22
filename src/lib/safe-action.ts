import { Role } from '@prisma/client';
import { cookies } from 'next/headers';
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { COOKIE_SESSION_KEY } from '@/config';
import { getUserFromSession } from '@/features/auth';
export class ActionError extends Error {}
export const action = createSafeActionClient({
  throwValidationErrors: false,
  defaultValidationErrorsShape: 'flattened',
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authAction = action.use(async ({ next }) => {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_SESSION_KEY)?.value;
  if (!session) {
    throw new ActionError('Session not found!');
  }
  const user = await getUserFromSession(cookieStore);
  if (!user) {
    throw new ActionError('Session is not valid!');
  }
  return next({ ctx: { user } });
});

export const adminAction = authAction.use(async ({ next, ctx }) => {
  const userRole = ctx.user.role;

  if (userRole !== Role.admin) {
    throw new ActionError('Invalid action');
  }
  return next({ ctx });
});
