'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { useAuthStore } from '@/features/auth/auth-slice';
import { Avatar, AvatarFallback } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logOutOfAllSessionsAction } from '@/features/auth/actions/log-out';

import { SignInButton } from './sign-in-button';

export const UserAvatarWrapper = () => {
  return (
    <div className="hidden md:block">
      <ClientUserAvatar />
    </div>
  );
};

const ClientUserAvatar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return <SignInButton />;
  }

  const firstLetter = user.email.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logOutOfAllSessionsAction();
    logout();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-10 w-10 bg-primary dark:bg-accent cursor-pointer">
          <AvatarFallback className="font-medium dark:text-accent-foreground">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <p className="text-sm font-medium">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
