import { InventorySkeleton } from '@/components/shared/inventory/inventory-skeleton';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function FavouritesLoading() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Title skeleton */}
      <div className="mb-8 lg:mb-10">
        <Skeleton className="h-10 w-64 rounded-md" />
      </div>

      {/* Filter/sort skeletons (if your page has them) */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>

      {/* Main content skeleton */}
      <InventorySkeleton count={CLASSIFIEDS_PER_PAGE} />

      {/* Pagination skeleton */}
      <div className="mt-12 flex justify-center">
        <Card className="p-2 flex items-center gap-2 border border-border/50">
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Previous */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Next */}
        </Card>
      </div>
    </div>
  );
}
