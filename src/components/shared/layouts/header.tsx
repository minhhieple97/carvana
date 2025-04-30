import { HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/config/constants';
import { routes } from '@/config/routes';
import { getFavourites } from '@/features/classifieds';
import { getSourceId } from '@/lib/source-id';
import { SignInPopup } from '@/components/auth';
import { SignInButton } from '@/components/auth/sign-in-button';

import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from '../theme-toggle';

export const PublicHeader = async () => {
  const sourceId = await getSourceId();
  const favourites = await getFavourites(sourceId);

  return (
    <header className="container mx-auto flex items-center justify-between h-16 px-4 bg-transparent gap-x-6">
      <div className="flex items-center flex-1">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image width={300} height={100} alt="logo" className="relative" src="/logo.svg" />
        </Link>
      </div>

      <nav className="hidden md:block">
        {navLinks.map((link) => (
          <Link
            className="group font-heading rounded px-3 py-2 text-base text-foreground hover:text-primary duration-300 transition-all ease-in-out font-semibold uppercase"
            href={link.href}
            key={link.id}
            prefetch
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <ThemeToggle />

      <div className="relative inline-flex group">
        <Link href={routes.favourites} className="flex items-center justify-center">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted 
                        transition-all duration-200 ease-in-out
                        group-hover:bg-pink-500"
          >
            <HeartIcon
              className="w-6 h-6 text-primary transition-all duration-200 ease-in-out
                         group-hover:text-white group-hover:fill-white"
            />
          </div>
          <div
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 
                        text-white bg-pink-500 rounded-full 
                        transition-all duration-200 ease-in-out
                        group-hover:bg-primary"
          >
            <span className="text-xs">{favourites ? favourites.ids.length : 0}</span>
          </div>
        </Link>
      </div>
      <SignInButton />

      <MobileMenu />
    </header>
  );
};
