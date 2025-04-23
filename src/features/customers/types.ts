import type { SortOrderType } from '@/config/constants';
import type { PageProps } from '@/config/types';
import type { Customer, CustomerStatus, Prisma } from '@prisma/client';

export type CustomerWithClassified = Prisma.CustomerGetPayload<{
  include: { classified: true };
}>;

export type CustomerTableProps = PageProps & {
  customers: Customer[];
  sort: CustomerKeys;
  order: 'asc' | 'desc';
  currentPage: number;
  totalPages: number;
};

export type CustomersTableHeaderProps = Pick<CustomerTableProps, 'sort' | 'order'>;

export type CustomerKeys = keyof Pick<
  Prisma.CustomerGetPayload<{ include: { classified: true } }>,
  | 'id'
  | 'email'
  | 'mobile'
  | 'firstName'
  | 'lastName'
  | 'updatedAt'
  | 'createdAt'
  | 'status'
  | 'bookingDate'
  | 'classified'
>;

export type CustomerFilterParams = {
  q?: string;
  status?: CustomerStatusParams;
};

export type CustomerPaginationParams = {
  offset: number;
  itemsPerPage: number;
  sort: CustomerKeys;
  order: SortOrderType;
};

export type CustomerStatusParams = CustomerStatus | 'ALL';

export type GetCustomersParams = {
  page: number;
  itemsPerPage: number;
  sort: CustomerKeys;
  order: SortOrderType;
  q: string | undefined;
  status: CustomerStatusParams | undefined;
};
