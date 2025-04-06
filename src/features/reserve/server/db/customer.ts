'server-only';
import { prisma } from '@/lib/prisma';

import type { CustomerStatus, Prisma } from '@prisma/client';

export const createCustomer = async (data: Prisma.CustomerCreateInput) =>
  prisma.customer.create({ data });

export const findCustomerReservation = async (
  email: string,
  slug: string,
  startOfDay: Date,
  endOfDay: Date
) =>
  prisma.customer.findFirst({
    where: {
      email,
      classifiedId: { not: null },
      classified: { slug },
      bookingDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

export const deleteCustomer = async (id: number) => prisma.customer.delete({ where: { id } });

export const findCustomerById = async (id: number) => prisma.customer.findUnique({ where: { id } });

export const updateCustomerStatus = async (
  id: number,
  status: CustomerStatus,
  oldStatus: CustomerStatus
) =>
  prisma.customer.update({
    where: { id },
    data: {
      status,
      lifecycle: {
        create: {
          oldStatus,
          newStatus: status,
        },
      },
    },
  });
