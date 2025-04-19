import { Skeleton } from '@/components/ui';
import { TableBody, TableCell, TableRow, Table } from '@/components/ui';

export default function ClassifiedsLoading() {
  return (
    <>
      <div className="flex flex-col p-6 space-y-4 bg-card/50 rounded-t-md border-b border-border/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>
      </div>

      <Table>
        <div className="border-b border-border/30">
          <TableRow>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
          </TableRow>
        </div>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <TableRow key={i} className="border-border/30">
                <TableCell>
                  <Skeleton className="h-5 w-8" />
                </TableCell>
                <TableCell className="p-0">
                  <Skeleton className="aspect-3/2 h-20 w-30" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-10" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <div className="border-primary-800 bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={10}>
              <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-48" />
              </div>
            </TableCell>
          </TableRow>
        </div>
      </Table>
    </>
  );
}
