import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerBadgeMap } from '@/config/constants';
import { routes } from '@/config/routes';
import type { PageProps } from '@/config/types';
import { EditCustomerForm } from '@/features/customers/components';
import { getCustomerById } from '@/features/customers/services';
import { formatCustomerStatus } from '@/lib/utils';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const validateCustomerId = (id: string | string[] | undefined) => {
  const { data, success } = z.object({ id: z.number() }).safeParse({
    id: Number(id),
  });
  return success ? data.id : null;
};

export default async function EditCustomerPage(props: PageProps) {
  const params = await props.params;
  const customerId = validateCustomerId(params?.id);
  if (!customerId) redirect(routes.admin.customers);

  const customer = await getCustomerById(customerId);
  if (!customer) redirect(routes.admin.customers);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex-col flex p-6 space-y-4 container">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg md:text-2xl text-foreground">Edit Customer</h1>
          <EditCustomerForm customer={customer} />
        </div>
      </div>

      <div className="container p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-foreground/80">
              <div>
                <strong className="text-foreground">Name:</strong> {customer.firstName}{' '}
                {customer.lastName}
              </div>
              <div>
                <strong className="text-foreground">Email:</strong> {customer.email}
              </div>
              <div>
                <strong className="text-foreground">Mobile:</strong> {customer.mobile}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Customer Status</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-foreground/80">
              <div>
                <strong className="text-foreground">Status:</strong>{' '}
                <Badge className="ml-2" variant={CustomerBadgeMap[customer.status]}>
                  {formatCustomerStatus(customer.status)}
                </Badge>
              </div>
              <div>
                <strong className="text-foreground">Terms Accepted:</strong>{' '}
                {customer.termsAccepted ? 'Yes' : 'No'}
              </div>
              <div>
                <strong className="text-foreground">Booking Date:</strong>{' '}
                {customer.bookingDate ? format(customer.bookingDate, 'do MMM yyy HH:mm') : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-foreground/80">
            <div>
              <strong className="text-foreground">Customer ID:</strong> {customer.id}
            </div>
            <div>
              <strong className="text-foreground">Classified Title:</strong>{' '}
              {customer.classified?.title}
            </div>
            <div>
              <strong className="text-foreground">Created:</strong>{' '}
              {format(customer.createdAt, 'do MMM yyy HH:mm')}
            </div>
            <div>
              <strong className="text-foreground">Last Updated:</strong>{' '}
              {format(customer.updatedAt, 'do MMM yyy HH:mm')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Customer Lifecycle</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-foreground font-semibold">Date</TableHead>
                  <TableHead className="text-foreground font-semibold">Old Status</TableHead>
                  <TableHead className="text-foreground font-semibold">New Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.lifecycle.map((entry) => (
                  <TableRow key={entry.id} className="border-border hover:bg-muted/50">
                    <TableCell className="text-foreground/80">
                      {format(entry.updatedAt, 'do MMM yyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-foreground/80">
                      {formatCustomerStatus(entry.oldStatus)}
                    </TableCell>
                    <TableCell className="text-foreground/80">
                      {formatCustomerStatus(entry.newStatus)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
