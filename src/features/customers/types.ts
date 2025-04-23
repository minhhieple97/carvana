import type { PageProps } from '@/config/types';
import type { Customer, Prisma } from '@prisma/client';

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
