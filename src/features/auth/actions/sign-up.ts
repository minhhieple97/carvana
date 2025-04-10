'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { action, ActionError } from '@/lib/safe-action';
import { SignUpSchema } from '@/schemas';

import { signUp } from '../services';

export const signUpAction = action.schema(SignUpSchema).action(async ({ parsedInput }) => {
  try {
    const { email, password } = parsedInput;

    const { success, error, user } = await signUp({ email, password });

    if (!success || !user) {
      throw new ActionError(error || 'Failed to create account');
    }

    return {
      message: 'Account created successfully!',
    };
  } catch (error) {
    console.error('Sign-up error:', error);
    if (isRedirectError(error)) throw error;

    if (error instanceof ActionError) {
      throw error;
    }

    throw new ActionError('Registration failed');
  }
});
