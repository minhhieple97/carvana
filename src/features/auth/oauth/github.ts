import { z } from 'zod';

import { env } from '@/env';

import { OAuthClient } from './base';

import type { OAuthProvider } from '@prisma/client';

const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
});

const GitHubEmailSchema = z.array(
  z.object({
    email: z.string().email(),
    primary: z.boolean(),
    verified: z.boolean(),
    visibility: z.string().nullable(),
  })
);

export class GitHubOAuthClient extends OAuthClient {
  constructor() {
    super({
      provider: 'github' as OAuthProvider,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      scopes: ['user:email', 'read:user'],
      urls: {
        auth: 'https://github.com/login/oauth/authorize',
        token: 'https://github.com/login/oauth/access_token',
        user: 'https://api.github.com/user',
        emails: 'https://api.github.com/user/emails',
      },
    });
  }

  protected async getUserInfo(accessToken: string, tokenType: string) {
    try {
      const userData = await this.fetchFromApi(this.urls.user, accessToken, tokenType);
      const userResult = GitHubUserSchema.safeParse(userData);

      if (!userResult.success) {
        throw new Error(`Invalid GitHub user data: ${userResult.error.message}`);
      }

      const user = userResult.data;
      let email = user.email;

      if (!email) {
        const emailsData = await this.fetchFromApi(this.urls.emails, accessToken, tokenType);
        const emailsResult = GitHubEmailSchema.safeParse(emailsData);

        if (!emailsResult.success) {
          throw new Error(`Invalid GitHub emails data: ${emailsResult.error.message}`);
        }

        const primaryEmail =
          emailsResult.data.find((e) => e.primary && e.verified) ||
          emailsResult.data.find((e) => e.verified) ||
          emailsResult.data[0];

        if (!primaryEmail) {
          throw new Error('No verified email found in GitHub account');
        }

        email = primaryEmail.email;
      }

      if (!email) {
        throw new Error('Could not retrieve email from GitHub account');
      }

      return {
        id: user.id.toString(),
        name: user.name || user.login,
        email,
      };
    } catch (error) {
      console.error('Error fetching GitHub user info:', error);
      throw error;
    }
  }
}

export function createGithubOAuthClient() {
  return new GitHubOAuthClient();
}
