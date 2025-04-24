import { Skeleton } from '@/components/ui/skeleton';

export default function EditCustomerLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex-col flex p-6 space-y-4 container">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg md:text-2xl text-foreground">Edit Customer</h1>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="container p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border-border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid gap-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>

          <div className="bg-card border-border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid gap-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
