'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { cookies } from 'next/headers';

import { action, ActionError } from '@/lib/safe-action';
import { SignInSchema } from '@/schemas';

import { createUserSession, signIn } from '../services';

export const signInAction = action.schema(SignInSchema).action(async ({ parsedInput }) => {
  try {
    const { email, password } = parsedInput;

    const user = await signIn({ email, password });

    await createUserSession(user, await cookies());
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError('Authentication failed');
  }
});
