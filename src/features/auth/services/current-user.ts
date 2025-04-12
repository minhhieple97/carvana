import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getUserFromSession } from './session';
import { getUserById } from '../db';

import type { FullUser } from '../types';
import type { User } from '@prisma/client';

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound?: false;
}): Promise<FullUser | null>;
function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound: true;
}): Promise<User>;
function _getCurrentUser(options?: {
  withFullUser?: false;
  redirectIfNotFound?: false;
}): Promise<User | null>;
async function _getCurrentUser({ withFullUser = false, redirectIfNotFound = false } = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect('/sign-in');
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserById(user.id);
    // This should never happen
    if (fullUser == null) throw new Error('User not found in database');
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);
