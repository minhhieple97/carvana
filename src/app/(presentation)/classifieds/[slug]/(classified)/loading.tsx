import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClassifiedDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-64 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Image gallery */}
        <div className="lg:col-span-2">
          {/* Main image skeleton */}
          <Skeleton className="w-full aspect-[4/3] rounded-md mb-4" />

          {/* Thumbnail gallery skeleton */}
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        {/* Right column - Details */}
        <div className="space-y-6">
          {/* Title and price */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>

          {/* Specs */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-8 w-48 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      </div>

      {/* Features section */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-8 w-48 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
      </div>

      {/* Similar vehicles section */}
      <div className="mt-12 space-y-6">
        <Skeleton className="h-8 w-64 rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full aspect-[4/3]" />
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
