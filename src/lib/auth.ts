'server-only';
import { Role } from '@prisma/client';
import { cookies } from 'next/headers';

import { COOKIE_SESSION_KEY } from '@/config';
import { getUserFromSession } from '@/features/auth';

import type { UserSession } from '@/features/auth';

export type AuthResult = {
  success: boolean;
  user?: UserSession;
  message?: string;
};

export const checkAuth = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_SESSION_KEY)?.value;
  if (!session) {
    return { success: false, message: 'Session not found!' };
  }
  const user = await getUserFromSession(cookieStore);
  if (!user) {
    return { success: false, message: 'Session is not valid!' };
  }

  return { success: true, user };
};

// Client-side auth check using the store
export const isAdmin = (userRole?: string): AuthResult => {
  if (userRole !== Role.admin) {
    return { success: false, message: 'Invalid action' };
  }

  return { success: true };
};

export const checkAdmin = async (): Promise<AuthResult> => {
  const authResult = await checkAuth();

  if (!authResult.success) {
    return authResult;
  }

  if (!isAdmin(authResult.user?.role).success) {
    return { success: false, message: 'Invalid action' };
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { success: true, user: authResult.user! };
};
