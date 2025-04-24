import { format } from 'date-fns';

import { TableRowBase, ResponsiveTableCell } from '@/components/shared/sortable-table';
import { Badge } from '@/components/ui';
import { CustomerBadgeMap } from '@/config';
import { formatCustomerStatus } from '@/lib/utils';

import { ActionButtons } from './action-buttons';

import type { CustomerWithClassified } from '../types';

export const CustomerTableRow = (customer: CustomerWithClassified) => (
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
