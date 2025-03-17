import Link from 'next/link';
import { HTMLParser } from '@/shared/html-parser';
import { routes } from '@/config/routes';
import { CardContentProps } from '../types';
import { CardSpecifications } from './card-specifications';
import { CardActions } from './card-actions';

export const CardContent = ({ classified, specifications }: CardContentProps) => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 space-y-3">
        <Link
          className="block text-gray-900 text-sm md:text-base font-bold 
                   line-clamp-1 transition-colors hover:text-primary"
          href={routes.singleClassified(classified.slug)}
        >
          {classified.title}
        </Link>

        {classified.description && (
          <div className="text-gray-600 text-sm line-clamp-2">
            <HTMLParser html={classified.description} />
          </div>
        )}

        <CardSpecifications specifications={specifications} />
      </div>

      <CardActions slug={classified.slug} />
    </div>
  );
};
