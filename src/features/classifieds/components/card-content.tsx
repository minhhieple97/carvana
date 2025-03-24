import Link from 'next/link';

import { routes } from '@/config/routes';
import { HTMLParser } from '@/shared/html-parser';

import { CardActions } from './card-actions';
import { CardSpecifications } from './card-specifications';

import type { CardContentProps } from '../types';

export const CardContent = ({ classified, specifications }: CardContentProps) => (
  <div className="flex flex-col p-2 sm:p-3 md:p-4">
    <div className="flex-1 space-y-2.5 sm:space-y-3 md:space-y-4">
      <Link
        className="block text-gray-900 text-[11px] xs:text-xs sm:text-sm md:text-base font-bold 
                   line-clamp-1 transition-colors hover:text-primary"
        href={routes.singleClassified(classified.slug)}
      >
        {classified.title}
      </Link>

      {classified.description && (
        <div className="text-gray-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm line-clamp-2">
          <HTMLParser html={classified.description} />
        </div>
      )}

      <div className="pt-1 sm:pt-2">
        <CardSpecifications specifications={specifications} />
      </div>
    </div>

    <div className="mt-3 sm:mt-4 md:mt-5">
      <CardActions slug={classified.slug} />
    </div>
  </div>
);
