import { Skeleton } from '@/components';

export default function EditClassifiedLoading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Upload Vehicle</h1>
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-40 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
