import { CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';

import type { CardActionsProps } from '../types';

export const CardActions = ({ slug }: CardActionsProps) => (
  <div className="mt-2 sm:mt-4 flex flex-col sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2">
    <Button
      className="group w-full bg-background dark:bg-background/90 border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/90 transition-all duration-300 text-[11px] xs:text-xs sm:text-sm"
      asChild
      variant="outline"
      size="sm"
    >
      <Link
        href={routes.reserve(slug, MultiStepFormEnum.WELCOME)}
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        <span>Reserve</span>
      </Link>
    </Button>

    <Button
      className="group w-full bg-primary dark:bg-primary/95 hover:bg-primary/90 dark:hover:bg-primary/85 transition-all duration-300 text-[11px] xs:text-xs sm:text-sm"
      asChild
      size="sm"
    >
      <Link
        href={routes.singleClassified(slug)}
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        <span>View Details</span>
      </Link>
    </Button>
  </div>
);
