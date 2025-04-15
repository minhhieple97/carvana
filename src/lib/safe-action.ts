import { cookies } from 'next/headers';
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

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
  const session = cookieStore.get('session')?.value;

  if (!session) {
    throw new Error('Session not found!');
  }
  const user = await getUserFromSession(cookieStore);
  if (!user) {
    throw new Error('Session is not valid!');
  }
  return next({ ctx: { user } });
});
