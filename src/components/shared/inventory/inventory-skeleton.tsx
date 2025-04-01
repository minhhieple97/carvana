import { ClassifiedCardSkeleton } from './classified-card-skeleton';

type InventorySkeletonProps = {
  count?: number;
};

// Added count prop for flexibility
export const InventorySkeleton = ({ count = 8 }: InventorySkeletonProps) => (
  // Use the same grid layout as the actual inventory list
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ClassifiedCardSkeleton key={index} /> // Use index as key for skeleton
    ))}
  </div>
);
