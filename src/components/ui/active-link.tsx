'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type ActiveLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};
export const ActiveLink = (props: ActiveLinkProps) => {
  const { href, children, className } = props;
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={cn(
        className,
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary'
          : 'text-white/80 hover:bg-white/30'
      )}
    >
      {children}
    </Link>
  );
};
