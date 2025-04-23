import { formatCustomerStatus } from '@/lib/utils';
import { format } from 'date-fns';
import { Badge } from '@/components/ui';
import { ActionButtons } from './action-buttons';
import { CustomerWithClassified } from '../types';
import { CustomerBadgeMap } from '@/config';
import { TableRowBase, ResponsiveTableCell } from '@/components/shared/sortable-table';

export const CustomerTableRow = (customer: CustomerWithClassified) => {
  return (
    <TableRowBase>
      <ResponsiveTableCell className="font-medium">{customer.id}</ResponsiveTableCell>

      <ResponsiveTableCell className="font-medium">
        <Badge variant={CustomerBadgeMap[customer.status]}>
          {formatCustomerStatus(customer.status)}
        </Badge>
      </ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>
        {customer.firstName} {customer.lastName}
      </ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>{customer.email}</ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>{customer.mobile}</ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>
        {customer.classified?.title} ({customer.classified?.vrm})
      </ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>
        {format(customer.createdAt, 'do MMM yyy HH:mm')}
      </ResponsiveTableCell>

      <ResponsiveTableCell hideOnMobile>
        {format(customer.updatedAt, 'do MMM yyy HH:mm')}
      </ResponsiveTableCell>

      <ResponsiveTableCell>
        {customer.bookingDate ? format(customer.bookingDate, 'do MMM yyy HH:mm') : 'N/A'}
      </ResponsiveTableCell>

      <ResponsiveTableCell className="flex gap-x-2">
        <ActionButtons customer={customer} />
      </ResponsiveTableCell>
    </TableRowBase>
  );
};
