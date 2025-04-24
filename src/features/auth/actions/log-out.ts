'use server';

import { cookies } from 'next/headers';

import { adminAction } from '@/lib/safe-action';

import { removeUserFromSession } from '../services/session';

const logOutOfAllSessions = async () => {
  const session = await cookies();
  await removeUserFromSession(session);
};

export const logOutOfAllSessionsAction = adminAction.action(logOutOfAllSessions);
