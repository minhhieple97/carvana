import { createGithubOAuthClient } from './github';

import type { OAuthClient } from './base';
import type { OAuthProvider } from '@prisma/client';

export function getOAuthClient(provider: OAuthProvider): OAuthClient {
  switch (provider) {
    case 'github':
      return createGithubOAuthClient();
    default:
      throw new Error(`Invalid provider oauth: ${provider}`);
  }
}
