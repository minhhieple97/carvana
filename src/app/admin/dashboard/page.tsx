import { KPICards } from '@/features/admin/components';
import { SalesChart } from '@/features/admin/components';
import { getChartData, getDashboardData } from '@/features/admin/services';
import { ChartData, KPIData } from '@/features/admin/types';

export type DashboardDataType = Promise<KPIData>;
export type ChartDataType = Promise<ChartData>;

export default async function AdminDashboardPage() {
  const dashboardData = getDashboardData();
  const chartData = getChartData();
  return (
    <>
      <KPICards data={dashboardData} />
      <SalesChart data={chartData} />
    </>
  );
}
