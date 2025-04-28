import { Skeleton } from '@/components/ui';

export default function AdminLoading() {
  return (
    <div className="flex bg-background min-h-screen w-full text-foreground">
      <div className="bg-black/20 h-screen overflow-hidden w-fit" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-[60px] items-center justify-between px-6">
          <Skeleton className="w-full max-w-md h-10" />
          <Skeleton className="ml-4 h-10 w-10 rounded-full" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
