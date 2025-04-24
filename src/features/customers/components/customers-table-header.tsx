'use client';

import {
  SortableTableHeader,
  SortableColumn,
  NonSortableColumn,
} from '@/components/shared/sortable-table';

import type { CustomerKeys } from '../types';
import type { SortOrderType } from '@/config/constants';

const customerKeys = [
  'id',
  'status',
  'firstName',
  'lastName',
  'email',
  'mobile',
  'classified',
  'createdAt',
  'updatedAt',
  'bookingDate',
] as const;

type CustomersTableHeaderProps = {
  sort: CustomerKeys;
  order: SortOrderType;
};

export const CustomersTableHeader = ({
  sort: initialSort,
  order: initialOrder,
}: CustomersTableHeaderProps) => (
  <SortableTableHeader<CustomerKeys>
    initialSort={initialSort}
    initialOrder={initialOrder}
    sortKeys={customerKeys}
  >
    {({ sort, order, handleSort }) => (
      <>
        <SortableColumn
          label="ID"
          sort="id"
          currentSort={sort}
          currentOrder={order}
          width="w-[80px]"
          onSort={handleSort}
        />
        <SortableColumn
          label="Status"
          sort="status"
          currentSort={sort}
          currentOrder={order}
          width="max-w-[150px]"
          onSort={handleSort}
        />
        <SortableColumn
          label="Name"
          sort="firstName"
          currentSort={sort}
          currentOrder={order}
          width="w-[150px]"
          onSort={handleSort}
        />
        <SortableColumn
          label="Email"
          sort="email"
          currentSort={sort}
          currentOrder={order}
          width="w-[150px]"
          onSort={handleSort}
        />
        <SortableColumn
          label="Mobile"
          sort="mobile"
          currentSort={sort}
          currentOrder={order}
          width="w-[150px]"
          onSort={handleSort}
        />
        <NonSortableColumn label="Classified" width="max-w-[150px]" />
        <SortableColumn
          label="Date Created"
          sort="createdAt"
          currentSort={sort}
          currentOrder={order}
          width="hidden md:table-cell"
          onSort={handleSort}
        />
        <SortableColumn
          label="Date Updated"
          sort="updatedAt"
          currentSort={sort}
          currentOrder={order}
          width="hidden md:table-cell"
          onSort={handleSort}
        />
        <SortableColumn
          label="Booking Date"
          sort="bookingDate"
          currentSort={sort}
          currentOrder={order}
          width="hidden md:table-cell"
          onSort={handleSort}
        />
        <NonSortableColumn label="Actions" width="w-[100px]" />
      </>
    )}
  </SortableTableHeader>
);
