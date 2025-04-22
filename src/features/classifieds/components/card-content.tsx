import Link from 'next/link';

import { routes } from '@/config/routes';
import { HTMLParser } from '@/shared/html-parser';

import { CardActions } from './card-actions';
import { CardSpecifications } from './card-specifications';

import type { CardContentProps } from '../types';

export const CardContent = ({ classified, specifications }: CardContentProps) => (
  <div className="flex flex-col h-full p-3 sm:p-4 md:p-5">
    <div className="flex-1 space-y-2 sm:space-y-3">
      <Link
        className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base font-semibold tracking-tight
                   text-foreground dark:text-foreground/95 line-clamp-1 transition-colors hover:text-primary"
        href={routes.singleClassified(classified.slug)}
      >
        {classified.title}
      </Link>

      {classified.description && (
        <div className="text-muted-foreground text-xs md:text-sm line-clamp-2 leading-snug">
          <HTMLParser html={classified.description} />
        </div>
      )}

      <div className="pt-2">
        <CardSpecifications specifications={specifications} />
      </div>
    </div>

    <div className="mt-auto pt-3 sm:pt-4">
      <CardActions slug={classified.slug} />
    </div>
  </div>
);
