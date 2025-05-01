'use client';

import { LogInIcon } from 'lucide-react';
import { useSignInPopup } from '../hooks/useSignInPopup';
import { SignInPopup } from './sign-in-popup';

export const SignInButton = () => {
  const { isOpen, openPopup, closePopup } = useSignInPopup();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openPopup();
    } else {
      closePopup();
    }
  };

  const trigger = (
    <button className="relative inline-flex items-center justify-center group" aria-label="Sign in">
      <div
        className="flex items-center gap-2 py-2 px-3 rounded-full transition-all duration-300 ease-in-out
                    bg-secondary hover:bg-secondary/80 dark:bg-secondary
                    text-secondary-foreground dark:text-secondary-foreground
                    border border-border/50 hover:border-border dark:border-input/30 dark:hover:border-input/70
                    shadow-sm hover:shadow group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2"
      >
        <LogInIcon className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        <span className="text-sm font-medium">Sign In</span>
      </div>
    </button>
  );

  return <SignInPopup isOpen={isOpen} onOpenChange={handleOpenChange} trigger={trigger} />;
};
