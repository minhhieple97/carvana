import { prisma } from '@/lib/prisma';

import type { CustomerFilterParams, CustomerPaginationParams } from '../types';

export const findCustomers = async (
  filter: CustomerFilterParams,
  pagination: CustomerPaginationParams
) =>
  prisma.customer.findMany({
    where: {
      ...(filter.q && { title: { contains: filter.q, mode: 'insensitive' } }),
      ...(filter.status && filter.status !== 'ALL' && { status: filter.status }),
    },
    orderBy: { [pagination.sort]: pagination.order },
    include: { classified: true },
    skip: pagination.offset,
    take: pagination.itemsPerPage,
  });

export const countCustomers = async (filter: CustomerFilterParams) =>
  prisma.customer.count({
    where: {
      ...(filter.q && { title: { contains: filter.q, mode: 'insensitive' } }),
      ...(filter.status && filter.status !== 'ALL' && { status: filter.status }),
    },
  });

export const findCustomerById = async (id: number) =>
  prisma.customer.findUnique({
    where: { id },
    include: { classified: true, lifecycle: true },
  });
