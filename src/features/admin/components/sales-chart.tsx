'use client';

import { use } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

import type { ChartDataType } from '@/app/admin/dashboard/page';

type SalesChartProps = {
  data: ChartDataType;
};

export const SalesChart = (props: SalesChartProps) => {
  const { data } = props;
  const chartData = use(data);

  return (
    <Card className="mb-6 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Monthly Sales {new Date().getFullYear() - 1}/{new Date().getFullYear()}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Number of cars sold per month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatPrice({ price: value, currency: 'GBP' })}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-2 rounded shadow-md">
        <p className="font-medium text-card-foreground">{label}</p>
        <p className="text-primary text-lg font-bold">
          {formatPrice({ price: payload[0].value as number, currency: 'GBP' })}
        </p>
      </div>
    );
  }
  return null;
};
