import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { cn, formatNumber, formatPrice } from '@/lib/utils';

import type { DashboardItem } from '../types';
import type React from 'react';
export const KPICard = (props: DashboardItem[][number]) => {
  const { icon: Icon, ...rest } = props;

  return (
    <Card key={rest.id} className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-card-foreground">{rest.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{rest.description}</CardDescription>
        </div>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="text-2xl font-bold text-card-foreground">
          {rest.style === 'currency'
            ? formatPrice({ price: rest.amount, currency: 'GBP' })
            : formatNumber(rest.amount, {
                style: rest.style,
                currency: 'GBP',
                maximumFractionDigits: 0,
              })}
        </span>

        <p
          className={cn(
            'text-xs',
            rest.percentage === 0 && 'text-muted-foreground',
            rest.percentage > 0 && 'text-green-500',
            rest.percentage < 0 && 'text-red-500'
          )}
        >
          {rest.percentage === 0
            ? `${rest.percentage}%`
            : formatNumber(rest.percentage / 100, {
                style: 'percent',
                maximumFractionDigits: 0,
              })}
        </p>
      </CardContent>
    </Card>
  );
};
