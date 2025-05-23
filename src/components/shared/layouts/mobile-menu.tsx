import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { navLinks } from '@/config/constants';
import { UserAvatarWrapper } from '@/features/auth/components/user-avatar-wrapper';

export const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="link" size="icon" className="md:hidden border-none">
        <MenuIcon className="h-6 w-6 text-primary" />
        <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-full max-w-xs p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-end mb-6">
        <UserAvatarWrapper />
      </div>
      <nav className="grid gap-2">
        {navLinks.map((link) => (
          <Link
            className="flex items-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            href={link.href}
            key={link.id}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);
