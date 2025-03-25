'use client';
import { Button } from '@/components/ui';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/config/constants';

export const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="link" size="icon" className="md:hidden border-none">
        <MenuIcon className="h-6 w-6 text-primary" />
        <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-full max-w-xs p-4 bg-white">
      <nav className="grid gap-2">
        {navLinks.map((link) => (
          <Link
            className="flex items-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
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
