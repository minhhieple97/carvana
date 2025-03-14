import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { CardActionsProps } from '../types';

export const CardActions = ({ slug }: CardActionsProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Button
        className="w-full transition-colors hover:bg-primary/90"
        asChild
        variant="outline"
        size="sm"
      >
        <Link href={routes.reserve(slug, MultiStepFormEnum.WELCOME)}>Reserve</Link>
      </Button>
      <Button className="w-full transition-colors hover:bg-primary/90" asChild size="sm">
        <Link href={routes.singleClassified(slug)}>View Details</Link>
      </Button>
    </div>
  );
};
