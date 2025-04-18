import { Table, TableBody } from '@/components/ui';
import { ClassifiedsTableHeader } from '@/features/classifieds/components/classifieds-table-header';
import { PageProps, routes } from '@/config';
import { ClassifiedKeys } from '@/features';
import { AdminClassifiedsHeader } from '@/features/admin/components/classifeds-header';
import { prisma } from '@/lib/prisma';
import { validatePagination } from '@/schemas/pagination.schema';
import { AdminClassifiedFilterSchema } from '@/schemas/table-filters.schema';
import { ClassifiedsTableSortSchema } from '@/schemas/table-sort.schema';
import { ClassifiedsTableSortType } from '@/schemas/table-sort.schema';
import { validateSortOrder } from '@/schemas/table-sort.schema';
import { ClassifiedsTableRow } from '@/features/classifieds/components/classified-table-row';
import { AdminTableFooter } from '@/components';

export default async function ClassifiedsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || '1',
    itemsPerPage: (searchParams?.itemsPerPage as '10') || '10',
  });

  const { sort, order } = validateSortOrder<ClassifiedsTableSortType>({
    sort: searchParams?.sort as ClassifiedKeys,
    order: searchParams?.order as 'asc' | 'desc',
    schema: ClassifiedsTableSortSchema,
  });

  const offset = (Number(page) - 1) * Number(itemsPerPage);

  const { data, error } = AdminClassifiedFilterSchema.safeParse(searchParams);

  if (error) console.log('Validation error: ', error);

  const classifieds = await prisma.classified.findMany({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
      ...(data?.status && data.status !== 'ALL' && { status: data.status }),
    },
    orderBy: { [sort as string]: order as 'asc' | 'desc' },
    include: { images: { take: 1 } },
    skip: offset,
    take: Number(itemsPerPage),
  });

  const count = await prisma.classified.count({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
      ...(data?.status && data.status !== 'ALL' && { status: data.status }),
    },
  });

  const totalPages = Math.ceil(count / Number(itemsPerPage));

  return (
    <>
      <AdminClassifiedsHeader searchParams={searchParams} />
      <Table>
        <ClassifiedsTableHeader sort={sort as ClassifiedKeys} order={order as 'asc' | 'desc'} />
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
