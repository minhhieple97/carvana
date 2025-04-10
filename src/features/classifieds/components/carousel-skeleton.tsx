import { Skeleton } from '@/components/ui/skeleton';

export const CarouselSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <Skeleton className="aspect-3/2 w-full" />
    <div className="grid grid-cols-4 mt-2 gap-2">
      <Skeleton className="aspect-3/2" />
      <Skeleton className="aspect-3/2" />
      <Skeleton className="aspect-3/2" />
      <Skeleton className="aspect-3/2" />
    </div>
  </div>
);
