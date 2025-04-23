'use client';

import {
  SortableTableHeader,
  SortableColumn,
  NonSortableColumn,
} from '@/components/shared/sortable-table';
import { ClassifiedKeys } from '../types';
import { SortOrderType } from '@/config/constants';

const classifiedKeys = [
  'status',
  'title',
  'vrm',
  'id',
  'views',
  'year',
  'colour',
  'price',
  'createdAt',
] as const;

type ClassifiedsTableHeaderProps = {
  sort: ClassifiedKeys;
  order: SortOrderType;
};

export const ClassifiedsTableHeader = ({
  sort: initialSort,
  order: initialOrder,
}: ClassifiedsTableHeaderProps) => {
  return (
    <SortableTableHeader<ClassifiedKeys>
      initialSort={initialSort}
      initialOrder={initialOrder}
      sortKeys={classifiedKeys}
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
          <NonSortableColumn label="Image" width="w-[80px]" />
          <SortableColumn
            label="Title"
            sort="title"
            currentSort={sort}
            currentOrder={order}
            width="w-[150px]"
            onSort={handleSort}
          />
          <SortableColumn
            label="Price"
            sort="price"
            currentSort={sort}
            currentOrder={order}
            width="w-[150px]"
            onSort={handleSort}
          />
          <SortableColumn
            label="VRM"
            sort="vrm"
            currentSort={sort}
            currentOrder={order}
            width="w-[150px]"
            onSort={handleSort}
          />
          <SortableColumn
            label="Colour"
            sort="colour"
            currentSort={sort}
            currentOrder={order}
            width="w-[150px]"
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
            label="Date Created"
            sort="createdAt"
            currentSort={sort}
            currentOrder={order}
            width="hidden md:table-cell"
            onSort={handleSort}
          />
          <SortableColumn
            label="Views"
            sort="views"
            currentSort={sort}
            currentOrder={order}
            width="w-[100px]"
            onSort={handleSort}
          />
          <NonSortableColumn label="Actions" width="w-[100px]" />
        </>
      )}
    </SortableTableHeader>
  );
};
