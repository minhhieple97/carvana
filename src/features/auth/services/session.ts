import crypto from 'crypto';

import { redis as redisClient } from '@/lib/redis-store';
import { SessionSchema } from '@/schemas';

import type { UserSession } from '../types';
import type { Cookies } from '../types';

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = 'session-id';
const SESSION_PREFIX = 'session:';

const generateSessionId = (): string => crypto.randomBytes(512).toString('hex').normalize();

const getSessionKey = (sessionId: string): string => `${SESSION_PREFIX}${sessionId}`;

const getSessionIdFromCookies = (cookies: Pick<Cookies, 'get'>): string | null =>
  cookies.get(COOKIE_SESSION_KEY)?.value ?? null;

const setCookie = (sessionId: string, cookies: Pick<Cookies, 'set'>): void => {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
};

export const getUserSessionById = async (sessionId: string): Promise<UserSession | null> => {
  const rawUser = await redisClient.get(getSessionKey(sessionId));
  const { success, data: user } = SessionSchema.safeParse(rawUser);
  return success ? user : null;
};

export const saveUserSession = async (sessionId: string, user: UserSession): Promise<void> => {
  await redisClient.set(getSessionKey(sessionId), SessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });
};

export const getUserFromSession = async (
  cookies: Pick<Cookies, 'get'>
): Promise<UserSession | null> => {
  const sessionId = getSessionIdFromCookies(cookies);
  if (!sessionId) return null;

  return getUserSessionById(sessionId);
};

export const updateUserSessionData = async (
  user: UserSession,
  cookies: Pick<Cookies, 'get'>
): Promise<void | null> => {
  const sessionId = getSessionIdFromCookies(cookies);
  if (!sessionId) return null;

  await saveUserSession(sessionId, user);
};

export const createUserSession = async (
  user: UserSession,
  cookies: Pick<Cookies, 'set'>
): Promise<void> => {
  const sessionId = generateSessionId();
  await saveUserSession(sessionId, user);
  setCookie(sessionId, cookies);
};

export const updateUserSessionExpiration = async (
  cookies: Pick<Cookies, 'get' | 'set'>
): Promise<void | null> => {
  const sessionId = getSessionIdFromCookies(cookies);
  if (!sessionId) return null;

  const user = await getUserSessionById(sessionId);
  if (!user) return;

  await saveUserSession(sessionId, user);
  setCookie(sessionId, cookies);
};

export const removeUserFromSession = async (
  cookies: Pick<Cookies, 'get' | 'delete'>
): Promise<void | null> => {
  const sessionId = getSessionIdFromCookies(cookies);
  if (!sessionId) return null;

  await redisClient.del(getSessionKey(sessionId));
  cookies.delete(COOKIE_SESSION_KEY);
};
