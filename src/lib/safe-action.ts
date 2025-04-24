import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { checkAuth, isAdmin } from './auth';

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
  const authResult = await checkAuth();

  if (!authResult.success) {
    throw new ActionError(authResult.message || 'Authentication failed');
  }

  return next({ ctx: { user: authResult.user } });
});

export const adminAction = authAction.use(async ({ next, ctx }) => {
  const adminResult = isAdmin(ctx.user?.role);

  if (!adminResult.success) {
    throw new ActionError(adminResult.message || 'Authorization failed');
  }

  return next({ ctx });
});
