import { CarIcon, PoundSterling, TrendingUpIcon, UsersIcon } from 'lucide-react';
import type React from 'react';
import { use } from 'react';
import { DashboardItem, KpiCardDataProps } from '../types';
import { KPICard } from './kpi-card';

export const KPICards = (props: KpiCardDataProps) => {
  const { data } = props;
  const {
    totalSales,
    carsSoldThisMonth,
    newCustomersThisMonth,
    conversionRate,
    conversionRatePercentageChange,
    salesPercentageChange,
    carsSoldPercentageChange,
    newCustomersPercentageChange,
  } = use(data);

  const dashboardData: DashboardItem[] = [
    {
      id: 1,
      title: 'Total Sales',
      description: 'Total sales revenue in the last 30 days',
      icon: PoundSterling,
      amount: totalSales,
      percentage: Math.round(salesPercentageChange),
      style: 'currency',
    },
    {
      id: 2,
      title: 'Cars Sold',
      description: 'Total number of cars sold in the last 30 days',
      icon: CarIcon,
      amount: carsSoldThisMonth,
      percentage: Math.round(carsSoldPercentageChange),
      style: 'decimal',
    },
    {
      id: 3,
      title: 'New Customers',
      description: 'Total number of new customers in the last 30 days',
      icon: UsersIcon,
      amount: newCustomersThisMonth,
      percentage: Math.round(newCustomersPercentageChange),
      style: 'decimal',
    },
    {
      id: 4,
      title: 'Conversion Rate',
      description: '% of sales in the last 30 days',
      icon: TrendingUpIcon,
      amount: conversionRate,
      percentage: Math.round(conversionRatePercentageChange),
      style: 'percent',
    },
  ];

  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.map((item) => (
        <KPICard key={item.id} {...item} />
      ))}
    </div>
  );
};
