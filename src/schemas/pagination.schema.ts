import { z } from 'zod';

import { ITEMS_PER_PAGE } from '@/config/constants';

export const PaginationSchema = z.object({
  page: z
    .string()
    .refine((val) => Number(val) > 0, {
      message: 'Page must be greater than 0',
    })
    .default('1'),
  itemsPerPage: z
    .enum(Object.values(ITEMS_PER_PAGE) as [string, ...string[]])
    .refine((val) => Number(val) > 0, {
      message: 'Items per page must be greater than 0',
    })
    .default(ITEMS_PER_PAGE['10']),
});

export type PaginationType = z.infer<typeof PaginationSchema>;

export const validatePagination = ({ page, itemsPerPage }: PaginationType) => {
  const { data, success, error } = PaginationSchema.safeParse({
    page,
    itemsPerPage,
  });

  if (error) console.error(error);

  if (!success) {
    return {
      page: '1',
      itemsPerPage: '10',
    };
  }

  return data;
};
