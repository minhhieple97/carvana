import {
  validatePagination,
  AdminCustomerFilterSchema,
  CustomersTableSortSchema,
  type CustomersTableSortType,
  validateSortOrder,
} from '@/schemas';
import {
  AdminCustomersHeader,
  CustomersTableHeader,
  CustomerTableRow,
} from '@/features/customers/components';

import { AdminTableFooter } from '@/components/shared/admin-table-footer';
import { Table, TableBody } from '@/components/ui/table';
import { routes } from '@/config/routes';
import type { PageProps } from '@/config/types';
import { prisma } from '@/lib/prisma';
import { CustomerKeys } from '@/features/customers/types';

export default async function CustomersPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || '1',
    itemsPerPage: (searchParams?.itemsPerPage as '10') || '10',
  });

  const { sort, order } = validateSortOrder<CustomersTableSortType>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as 'asc' | 'desc',
    schema: CustomersTableSortSchema,
  });

  const offset = (Number(page) - 1) * Number(itemsPerPage);

  const { data, error } = AdminCustomerFilterSchema.safeParse(searchParams);

  if (error) console.log('Validation error: ', error);

  const customers = await prisma.customer.findMany({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
      ...(data?.status && data.status !== 'ALL' && { status: data.status }),
    },
    orderBy: { [sort as string]: order as 'asc' | 'desc' },
    include: { classified: true },
    skip: offset,
    take: Number(itemsPerPage),
  });

  const count = await prisma.customer.count({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
      ...(data?.status && data.status !== 'ALL' && { status: data.status }),
    },
  });

  const totalPages = Math.ceil(count / Number(itemsPerPage));

  return (
    <>
      <AdminCustomersHeader searchParams={searchParams} />
      <Table>
        <CustomersTableHeader sort={sort as CustomerKeys} order={order as 'asc' | 'desc'} />
        <TableBody>
          {customers.map((customer) => (
            <CustomerTableRow key={customer.id} {...customer} />
          ))}
        </TableBody>
        <AdminTableFooter
          baseURL={routes.admin.customers}
          searchParams={searchParams}
          disabled={!customers.length}
          totalPages={totalPages}
          cols={10}
        />
      </Table>
    </>
  );
}
