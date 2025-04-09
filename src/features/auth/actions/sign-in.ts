'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { SignInSchema } from '@/app/schemas';
import { action, ActionError } from '@/lib/safe-action';

import { signIn } from '../services';

export const signInAction = action.schema(SignInSchema).action(async ({ parsedInput }) => {
  try {
    const { email, password } = parsedInput;

    // Authenticate the user
    const { success, error, user } = await signIn({ email, password });

    if (!success || !user) {
      throw new ActionError(error || 'Invalid credentials');
    }

    return {
      message: 'Signed in successfully!',
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    if (isRedirectError(error)) throw error;

    if (error instanceof ActionError) {
      throw error;
    }

    throw new ActionError('Authentication failed');
  }
});
