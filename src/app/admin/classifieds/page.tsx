import { AdminTableFooter } from '@/components';
import { Table, TableBody } from '@/components/ui';
import { ADMIN_CLASSIFIEDS_PER_PAGE, ADMIN_CLASSIFIEDS_PAGE, routes } from '@/config';
import { AdminClassifiedsHeader } from '@/features/admin/components/classifeds-header';
import { getAdminClassifieds } from '@/features/admin/services/classified.service';
import { ClassifiedsTableRow } from '@/features/classifieds/components/classified-table-row';
import { ClassifiedsTableHeader } from '@/features/classifieds/components/classifieds-table-header';
import { validatePagination } from '@/schemas/pagination.schema';

import { AdminClassifiedFilterSchema } from '@/schemas/table-filters.schema';
import type { ItemsPerPageType, PageProps, SortOrderType } from '@/config';

import type { ClassifiedKeys } from '@/features';

import type { ClassifiedsTableSortType } from '@/schemas/table-sort.schema';

import { ClassifiedsTableSortSchema } from '@/schemas/table-sort.schema';
import { validateSortOrder } from '@/schemas/table-sort.schema';

export default async function ClassifiedsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || ADMIN_CLASSIFIEDS_PAGE,
    itemsPerPage: (searchParams?.itemsPerPage as string) || ADMIN_CLASSIFIEDS_PER_PAGE,
  });

  const { sort, order } = validateSortOrder<ClassifiedsTableSortType>({
    sort: searchParams?.sort as ClassifiedKeys,
    order: searchParams?.order as SortOrderType,
    schema: ClassifiedsTableSortSchema,
  });

  const { data: filters, error } = AdminClassifiedFilterSchema.safeParse(searchParams);
  if (error) console.error('Validation error: ', error);
  const { classifieds, totalPages } = await getAdminClassifieds({
    page,
    itemsPerPage: itemsPerPage as ItemsPerPageType,
    sort: sort as ClassifiedKeys,
    order: order as SortOrderType,
    filters: filters || {},
  });

  return (
    <>
      <AdminClassifiedsHeader searchParams={searchParams} />
      <Table>
        <ClassifiedsTableHeader sort={sort as ClassifiedKeys} order={order as SortOrderType} />
        <TableBody>
          {classifieds.map((classified) => (
            <ClassifiedsTableRow key={classified.id} {...classified} />
          ))}
        </TableBody>
        <AdminTableFooter
          baseURL={routes.admin.classifieds}
          searchParams={searchParams}
          disabled={!classifieds.length}
          totalPages={totalPages}
          cols={10}
        />
      </Table>
    </>
  );
}
