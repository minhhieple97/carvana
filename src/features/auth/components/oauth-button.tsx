'use client';

import { Github } from 'lucide-react';

import { Button } from '@/components/ui';

import { oAuthSignIn } from '../actions/sign-in';

import type { OAuthProvider } from '@prisma/client';

export const OAuthButton = ({ provider }: { provider: OAuthProvider }) => {
  const handleOAuthSignIn = async () => {
    await oAuthSignIn(provider);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleOAuthSignIn}
      className="w-full flex items-center justify-center gap-2"
    >
      {provider === 'github' && <Github className="h-4 w-4" />}
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
};
