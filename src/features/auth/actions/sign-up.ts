'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { cookies } from 'next/headers';

import { action, ActionError } from '@/lib/safe-action';
import { SignUpSchema } from '@/schemas';

import { createUserSession, signUp } from '../services';

export const signUpAction = action.schema(SignUpSchema).action(async ({ parsedInput }) => {
  try {
    const { email, password } = parsedInput;

    const user = await signUp({ email, password });
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error('Sign-up error:', error);
    if (isRedirectError(error)) throw error;

    if (error instanceof ActionError) {
      throw error;
    }

    throw new ActionError('Registration failed');
  }
});
