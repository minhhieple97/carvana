import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function CustomersLoading() {
  return (
    <>
      <div className="flex flex-col p-6 space-y-4 bg-card/50 rounded-t-md border-b border-border/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="font-semibold text-xl md:text-2xl text-foreground">All Customers</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Skeleton className="h-9 w-[320px]" />
          </div>
        </div>
      </div>

      <Table>
        <thead className="[&_tr]:border-b">
          <TableRow>
            {[...Array(10)].map((_, i) => (
              <th key={i} className="h-10 px-2 text-left">
                <Skeleton className="h-5 w-full" />
              </th>
            ))}
          </TableRow>
        </thead>
        <TableBody>
          {[...Array(10)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(10)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <tfoot className="border-t border-border bg-background">
          <TableRow className="hover:bg-muted/50">
            <TableCell colSpan={10}>
              <div className="flex items-center justify-between py-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-[250px]" />
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </>
  );
}
