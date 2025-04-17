import { fetchMonthlyKPIData, fetchMonthlySalesData } from '../db';
import { calculatePercentageChange } from '@/lib/utils';

export type ChartDataItem = {
  month: string;
  sales: number;
};

export type ChartData = ChartDataItem[];

export interface KPIData {
  totalSales: number;
  carsSoldThisMonth: number;
  newCustomersThisMonth: number;
  conversionRate: number;
  conversionRatePercentageChange: number;
  salesPercentageChange: number;
  carsSoldPercentageChange: number;
  newCustomersPercentageChange: number;
}

export async function getDashboardData(): Promise<KPIData> {
  const {
    carsSoldThisMonth,
    carsSoldLastMonth,
    newCustomersThisMonth,
    newCustomersLastMonth,
    purchasedCustomersThisMonth,
    purchasedCustomersLastMonth,
    totalSales,
    previousTotalSales,
  } = await fetchMonthlyKPIData();

  const conversionRate =
    newCustomersThisMonth > 0 ? purchasedCustomersThisMonth / newCustomersThisMonth : 0;

  const previousConversionRate =
    newCustomersLastMonth > 0 ? purchasedCustomersLastMonth / newCustomersLastMonth : 0;

  const conversionRatePercentageChange = calculatePercentageChange(
    conversionRate,
    previousConversionRate
  );

  const salesPercentageChange = calculatePercentageChange(totalSales, previousTotalSales);
  const carsSoldPercentageChange = calculatePercentageChange(carsSoldThisMonth, carsSoldLastMonth);
  const newCustomersPercentageChange = calculatePercentageChange(
    newCustomersThisMonth,
    newCustomersLastMonth
  );

  return {
    totalSales,
    carsSoldThisMonth,
    newCustomersThisMonth,
    conversionRate,
    conversionRatePercentageChange,
    salesPercentageChange,
    carsSoldPercentageChange,
    newCustomersPercentageChange,
  };
}

export async function getChartData(): Promise<ChartData> {
  return fetchMonthlySalesData();
}
