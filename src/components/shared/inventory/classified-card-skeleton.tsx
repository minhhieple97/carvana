import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ClassifiedCardSkeleton = () => (
  <Card className="border border-border/50 overflow-hidden group">
    <div className="relative w-full bg-muted/50">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
    </div>

    <CardContent className="p-4 space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-1/3 mt-2" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-border/50">
        <div className="space-y-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="flex gap-x-2 pt-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-12 flex-shrink-0" />
      </div>
    </CardContent>
  </Card>
);
