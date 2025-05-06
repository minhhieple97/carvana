'use client';
import { useAuthStore } from '@/features/auth/auth-slice';
import { Avatar, AvatarFallback } from '@/components/ui';

import { SignInButton } from './sign-in-button';
export const UserAvatarWrapper = () => {
  return (
    <div className="hidden md:block">
      <ClientUserAvatar />
    </div>
  );
};

const ClientUserAvatar = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <SignInButton />;
  }

  const firstLetter = user.email.charAt(0).toUpperCase();

  return (
    <Avatar className="h-10 w-10 bg-primary text-primary-foreground hover:ring-2 hover:ring-ring transition-all cursor-pointer shadow-sm">
      <AvatarFallback className="font-medium bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground">
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
};
