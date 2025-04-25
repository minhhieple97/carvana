import { Skeleton } from '@/components/ui';
import { CLASSIFIEDS_PER_PAGE } from '@/config'; // Use the same count for skeleton items

export default function ClassifiedsLoading() {
  const skeletonCardCount = CLASSIFIEDS_PER_PAGE;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-72 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-md hidden lg:block animate-pulse">
            <div className="sticky top-4">
              <div className="border-b border-border p-5">
                <div className="mb-5 flex items-center justify-between">
                  <Skeleton className="h-8 w-24 rounded-full bg-muted" />
                </div>
                <Skeleton className="h-10 w-full bg-muted rounded-md" />
              </div>
              <div className="space-y-7 p-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`filter-skeleton-${index}`} className="space-y-2">
                    <Skeleton className="h-4 w-1/3 bg-muted" />
                    <Skeleton className="h-10 w-full bg-muted rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-2 animate-pulse">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-48 bg-muted rounded" />
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <Skeleton className="h-10 w-10 rounded-md bg-muted lg:hidden" />{' '}
                    <div className="hidden lg:flex items-center gap-1 md:gap-2">
                      <Skeleton className="h-8 w-20 rounded-md bg-muted" />
                      <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                      <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                      <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                      <Skeleton className="h-8 w-20 rounded-md bg-muted" />
                    </div>
                  </div>
                </div>
              </header>

              <section className="bg-card text-card-foreground border border-border rounded-xl shadow-sm p-4 sm:p-6">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                  {Array.from({ length: skeletonCardCount }).map((_, index) => (
                    <div
                      key={`classified-skeleton-${index}`}
                      className="rounded-lg border border-border bg-card/50 overflow-hidden animate-pulse"
                    >
                      <Skeleton className="h-48 w-full bg-muted" />
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-5 w-3/4 bg-muted rounded" />
                        <Skeleton className="h-4 w-1/2 bg-muted rounded" />
                        <Skeleton className="h-4 w-5/6 bg-muted rounded" />
                        <Skeleton className="h-4 w-1/3 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
