import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { routes } from '@/config';
import { createUserSession, getOAuthClient } from '@/features/auth';
import { prisma } from '@/lib/prisma';

import type { OAuthUser } from '@/features/auth';
import type { OAuthProvider } from '@prisma/client';
import type { NextRequest } from 'next/server';

const oAuthProviders = ['discord', 'github'] as const;
const providerSchema = z.enum(oAuthProviders);
type Params = {
  provider: string;
};
export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const providerResult = providerSchema.safeParse(rawProvider);
  if (!providerResult.success) {
    redirect(`/${routes.signIn}?oauthError=${encodeURIComponent('Invalid provider')}`);
  }
  const provider = providerResult.data as OAuthProvider;

  if (typeof code !== 'string' || typeof state !== 'string') {
    redirect(
      `${routes.signIn}?oauthError=${encodeURIComponent('Failed to connect. Please try again.')}`
    );
  }

  const oAuthClient = getOAuthClient(provider);
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    const user = await connectUserToAccount(oAuthUser, provider);
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    redirect(
      `${routes.signIn}?oauthError=${encodeURIComponent('Failed to connect. Please try again.')}`
    );
  }

  redirect('/');
}

const connectUserToAccount = async ({ id, email }: OAuthUser, provider: OAuthProvider) =>
  await prisma.$transaction(async (tx) => {
    let user = await tx.user.findUnique({
      where: { email },
      select: { id: true, role: true, email: true },
    });

    if (!user) {
      user = await tx.user.create({
        data: {
          email,
        },
        select: { id: true, role: true, email: true },
      });
    }

    await tx.userOAuthAccount.upsert({
      where: {
        providerAccountId_provider: {
          providerAccountId: id,
          provider,
        },
      },
      update: {},
      create: {
        provider,
        providerAccountId: id,
        userId: user.id,
      },
    });

    return user;
  });
