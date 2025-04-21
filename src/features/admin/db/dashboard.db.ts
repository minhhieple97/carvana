import { ClassifiedStatus, CustomerStatus } from '@prisma/client';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

import { prisma } from '@/lib/prisma';

export async function fetchMonthlySalesData() {
  const now = new Date();
  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const startDate = startOfMonth(subMonths(now, i));
    const endDate = endOfMonth(startDate);

    const monthlySales = await prisma.classified.aggregate({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        price: true,
      },
    });

    monthsData.unshift({
      month: format(startDate, 'MMM'),
      sales: monthlySales._sum.price || 0,
    });
  }

  return monthsData;
}

export async function fetchMonthlyKPIData() {
  const now = new Date();
  const startOfThisMonth = startOfMonth(now);
  const endOfThisMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(subMonths(now, 1));

  const lastMonthPromises = {
    carsSoldThisMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    carsSoldLastMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
    newCustomersThisMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    newCustomersLastMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
    purchasedCustomersThisMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    purchasedCustomersLastMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
  };

  const totalSalesThisMonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfThisMonth,
        lte: endOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const totalSalesPreviousMonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfLastMonth,
        lt: startOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const [
    carsSoldThisMonth,
    carsSoldLastMonth,
    newCustomersThisMonth,
    newCustomersLastMonth,
    purchasedCustomersThisMonth,
    purchasedCustomersLastMonth,
  ] = await Promise.all(Object.values(lastMonthPromises));

  const [salesThisMonth, salesPreviousMonth] = await Promise.all([
    totalSalesThisMonth,
    totalSalesPreviousMonth,
  ]);

  return {
    carsSoldThisMonth,
    carsSoldLastMonth,
    newCustomersThisMonth,
    newCustomersLastMonth,
    purchasedCustomersThisMonth,
    purchasedCustomersLastMonth,
    totalSales: salesThisMonth._sum.price || 0,
    previousTotalSales: salesPreviousMonth._sum.price || 0,
  };
}
