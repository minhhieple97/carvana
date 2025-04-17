import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Button } from '@/components/ui/button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1.5 md:gap-2', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  href: string;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  Omit<React.ComponentProps<typeof Link>, 'href'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  href,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      prefetch
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        'rounded-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 min-w-[32px] h-[32px] flex items-center justify-center',
        isActive && 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        'gap-1 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="hidden sm:block text-sm font-medium">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        'gap-1 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
      {...props}
    >
      <span className="hidden sm:block text-sm font-medium">Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center text-gray-400', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
