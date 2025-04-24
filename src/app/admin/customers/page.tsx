import { AdminTableFooter } from '@/components/shared/admin-table-footer';
import { Table, TableBody } from '@/components/ui/table';
import { ADMIN_CUSTOMERS_PER_PAGE, ADMIN_CUSTOMERS_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  AdminCustomersHeader,
  CustomersTableHeader,
  CustomerTableRow,
} from '@/features/customers/components';
import { getCustomers } from '@/features/customers/services';
import {
  validatePagination,
  AdminCustomerFilterSchema,
  CustomersTableSortSchema,
  type CustomersTableSortType,
  validateSortOrder,
} from '@/schemas';

import type { SortOrderType } from '@/config/constants';
import type { PageProps } from '@/config/types';
import type { CustomerKeys } from '@/features/customers/types';

export default async function CustomersPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || ADMIN_CUSTOMERS_PAGE,
    itemsPerPage: (searchParams?.itemsPerPage as string) || ADMIN_CUSTOMERS_PER_PAGE,
  });

  const { sort, order } = validateSortOrder<CustomersTableSortType>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as SortOrderType,
    schema: CustomersTableSortSchema,
  });

  const { data } = AdminCustomerFilterSchema.safeParse(searchParams);

  const { customers, totalPages } = await getCustomers({
    page: Number(page),
    itemsPerPage: Number(itemsPerPage),
    sort,
    order,
    q: data?.q,
    status: data?.status,
  });

  return (
    <>
      <AdminCustomersHeader searchParams={searchParams} />
      <Table>
        <CustomersTableHeader sort={sort} order={order} />
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
