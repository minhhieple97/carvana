import { RadioFilter } from '@/components/shared/radio-filter';
import type { AwaitedPageProps } from '@/config/types';
import { ClassifiedStatus } from '@prisma/client';
import { CreateClassifiedDialog } from './create-classified-dialog';

export const AdminClassifiedsHeader = ({ searchParams }: AwaitedPageProps) => {
  return (
    <div className="flex flex-col p-6 space-y-4 bg-card/50 rounded-t-md border-b border-border/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-semibold text-xl md:text-2xl text-foreground">All Classifieds</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <RadioFilter
            items={['ALL', ...Object.values(ClassifiedStatus)]}
            searchParams={searchParams}
          />
          <CreateClassifiedDialog />
        </div>
      </div>
    </div>
  );
};
