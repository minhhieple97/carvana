export type DashboardDataType = Promise<KPIData>;
export type ChartDataType = Promise<ChartData>;

export type ChartDataItem = {
  month: string;
  sales: number;
};

export type ChartData = ChartDataItem[];

export type KPIData = {
  totalSales: number;
  carsSoldThisMonth: number;
  newCustomersThisMonth: number;
  conversionRate: number;
  conversionRatePercentageChange: number;
  salesPercentageChange: number;
  carsSoldPercentageChange: number;
  newCustomersPercentageChange: number;
};

export type DashboardItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  amount: number;
  percentage: number;
  style: Intl.NumberFormatOptions['style'];
};

export type KpiCardDataProps = {
  data: DashboardDataType;
};
