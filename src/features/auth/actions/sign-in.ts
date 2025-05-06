'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { action, ActionError } from '@/lib/safe-action';
import { SignInSchema } from '@/schemas';

import { getOAuthClient } from '../oauth';
import { createUserSession, signIn } from '../services';

import type { OAuthProvider } from '@prisma/client';

export const signInAction = action.schema(SignInSchema).action(async ({ parsedInput }) => {
  try {
    const { email, password } = parsedInput;

    const user = await signIn({ email, password });

    await createUserSession(user, await cookies());

    return { user };
  } catch (error) {
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError('Authentication failed');
  }
});

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}
