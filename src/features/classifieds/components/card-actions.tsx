import { CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';

import type { CardActionsProps } from '../types';

export const CardActions = ({ slug }: CardActionsProps) => (
  <div className="mt-4 flex flex-col sm:grid sm:grid-cols-2 gap-2">
    <Button
      className="group w-full bg-white border-primary text-primary hover:bg-primary/5 hover:border-primary/90 transition-all duration-300 text-xs sm:text-sm"
      asChild
      variant="outline"
      size="sm"
    >
      <Link
        href={routes.reserve(slug, MultiStepFormEnum.WELCOME)}
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>Reserve</span>
      </Link>
    </Button>

    <Button
      className="group w-full bg-primary hover:bg-primary/90 transition-all duration-300 text-xs sm:text-sm"
      asChild
      size="sm"
    >
      <Link
        href={routes.singleClassified(slug)}
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        <span>View Details</span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </Button>
  </div>
);
