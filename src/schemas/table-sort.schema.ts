import { z } from 'zod';

import { SORT_ORDER } from '@/config/constants';

export const CustomersTableSortSchema = z.object({
  order: z.enum(['asc', 'desc']).default('desc'),
  sort: z
    .enum([
      'id',
      'email',
      'mobile',
      'firstName',
      'lastName',
      'updatedAt',
      'createdAt',
      'status',
      'bookingDate',
      'classified',
    ])
    .default('createdAt'),
});

export type CustomersTableSortType = z.infer<typeof CustomersTableSortSchema>;

export const ClassifiedsTableSortSchema = z.object({
  order: z.enum(Object.values(SORT_ORDER) as [string, ...string[]]).default(SORT_ORDER.DESC),
  sort: z
    .enum(['status', 'title', 'vrm', 'id', 'views', 'year', 'colour', 'price', 'createdAt'])
    .default('createdAt'),
});

export type ClassifiedsTableSortType = z.infer<typeof ClassifiedsTableSortSchema>;

export type ValidateSortOrderArgs<TSchemaType> = {
  sort: string;
  order: string;
  schema: TSchemaType extends ClassifiedsTableSortType
    ? typeof ClassifiedsTableSortSchema
    : typeof CustomersTableSortSchema;
};

export function validateSortOrder<TSchemaType>(args: ValidateSortOrderArgs<TSchemaType>) {
  const { sort, order, schema } = args;
  const { data, success, error } = schema.safeParse({
    sort,
    order,
  });

  if (error) console.error(error);

  if (!success) {
    return {
      sort: undefined,
      order: undefined,
    };
  }

  return data;
}
