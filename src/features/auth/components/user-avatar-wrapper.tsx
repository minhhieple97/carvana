'use client';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

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
      <DropdownMenuTrigger className="outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar className="h-10 w-10 bg-primary/10 dark:bg-accent border border-border dark:border-input-border ring-1 ring-primary/20 dark:ring-accent/30 hover:ring-primary/50 dark:hover:ring-accent/50 current-pointer transition-all">
          <AvatarFallback className="text-primary dark:text-accent-foreground font-medium">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <div className="px-2 py-2.5 flex items-center gap-3 mb-1">
          <div className="bg-secondary/80 dark:bg-accent p-2 rounded-full">
            <User className="h-4 w-4 text-secondary-foreground dark:text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium line-clamp-1">{user.email}</p>
            <p className="text-xs text-muted-foreground">Your account</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:text-destructive focus:text-destructive mt-1 focus:bg-destructive/10 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="text-destructive dark:text-destructive-foreground">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
