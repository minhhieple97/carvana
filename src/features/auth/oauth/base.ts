import crypto from 'crypto';

import { z } from 'zod';

import { env } from '@/env';

import type { Cookies } from '../types';
import type { OAuthProvider } from '@prisma/client';

const STATE_COOKIE_KEY = 'oAuthState';
const CODE_VERIFIER_COOKIE_KEY = 'oAuthCodeVerifier';
// Ten minutes in seconds
const COOKIE_EXPIRATION_SECONDS = 60 * 10;

export abstract class OAuthClient {
  protected readonly provider: OAuthProvider;
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly scopes: string[];
  protected readonly urls: {
    auth: string;
    token: string;
    user: string;
    [key: string]: string; // Allow additional API URLs
  };
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
  }: {
    provider: OAuthProvider;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
      [key: string]: string;
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
  }

  protected get redirectUrl() {
    return new URL(this.provider, env.OAUTH_REDIRECT_URL_BASE);
  }

  createAuthUrl(cookies: Pick<Cookies, 'set'>) {
    const state = createState(cookies);
    const codeVerifier = createCodeVerifier(cookies);
    const url = new URL(this.urls.auth);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('redirect_uri', this.redirectUrl.toString());
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', this.scopes.join(' '));
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('code_challenge', crypto.hash('sha256', codeVerifier, 'base64url'));
    return url.toString();
  }

  async fetchUser(code: string, state: string, cookies: Pick<Cookies, 'get'>) {
    const isValidState = validateState(state, cookies);
    if (!isValidState) throw new InvalidStateError();

    const { accessToken, tokenType } = await this.fetchToken(code, getCodeVerifier(cookies));
    return this.getUserInfo(accessToken, tokenType);
  }

  protected async fetchFromApi(url: string, accessToken: string, tokenType: string) {
    const response = await fetch(url, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Abstract method to be implemented by provider-specific classes
  protected abstract getUserInfo(
    accessToken: string,
    tokenType: string
  ): Promise<{
    id: string;
    email: string;
    name: string;
  }>;

  private async fetchToken(code: string, codeVerifier: string) {
    try {
      const response = await fetch(this.urls.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          code,
          redirect_uri: this.redirectUrl.toString(),
          grant_type: 'authorization_code',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const rawData = await response.json();
      const { data, success, error } = this.tokenSchema.safeParse(rawData);

      if (!success) throw new InvalidTokenError(error);

      return {
        accessToken: data.access_token,
        tokenType: data.token_type,
      };
    } catch (error) {
      console.error('Error fetching OAuth token:', error);
      throw new Error('Failed to fetch OAuth token');
    }
  }
}

class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super('Invalid Token');
    this.cause = zodError;
  }
}

class InvalidStateError extends Error {
  constructor() {
    super('Invalid State');
  }
}

class InvalidCodeVerifierError extends Error {
  constructor() {
    super('Invalid Code Verifier');
  }
}

const createState = (cookies: Pick<Cookies, 'set'>) => {
  const state = crypto.randomBytes(64).toString('hex').normalize();
  cookies.set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return state;
};

const createCodeVerifier = (cookies: Pick<Cookies, 'set'>) => {
  const codeVerifier = crypto.randomBytes(64).toString('hex').normalize();
  cookies.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return codeVerifier;
};

const validateState = (state: string, cookies: Pick<Cookies, 'get'>) => {
  const cookieState = cookies.get(STATE_COOKIE_KEY)?.value;
  return cookieState === state;
};

const getCodeVerifier = (cookies: Pick<Cookies, 'get'>) => {
  const codeVerifier = cookies.get(CODE_VERIFIER_COOKIE_KEY)?.value;
  if (codeVerifier == null) throw new InvalidCodeVerifierError();
  return codeVerifier;
};
