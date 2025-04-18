import type { ClassifiedAI } from '@/schemas/classified-ai.schema';
import type { Prisma } from '@prisma/client';
import type { Make } from '@prisma/client';
import type { UserContent } from 'ai';
import type { StreamableValue } from 'ai/rsc';
import type { ReactNode } from 'react';

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

export type MapToTaxonomyInput = {
  year: number;
  make: string;
  model: string;
  modelVariant: string | null;
};

export type MappedTaxonomyOutput = {
  year: number;
  make: string;
  model: string;
  modelVariant: string | null;
  makeId: number;
  modelId: number;
  modelVariantId: number | null;
};

export type StreamableSkeletonProps = Partial<Omit<ClassifiedAI, 'make'>> & {
  make?: Make;
  done?: boolean;
};

export type CreateClassifiedImageDbInput = Omit<Prisma.ImageUncheckedCreateInput, 'classifiedId'>;

export type CreateClassifiedDbInput = Omit<
  Prisma.ClassifiedUncheckedCreateInput,
  'id' | 'createdAt' | 'updatedAt' | 'images' | 'price'
> & {
  price: number;
  images: CreateClassifiedImageDbInput[];
};

export type UpdateClassifiedImagesInput = Omit<
  Prisma.ImageUncheckedCreateInput,
  'classifiedId' | 'id'
>;

export type UpdateClassifiedDbInput = Omit<
  Prisma.ClassifiedUncheckedUpdateInput,
  'id' | 'createdAt' | 'updatedAt' | 'images' | 'price'
> & {
  price: number;
};

export type ServerMessage = {
  id?: number;
  name?: string | undefined;
  role: 'user' | 'assistant' | 'system';
  content: UserContent;
};

export type ClientMessage = {
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
  classified: StreamableValue<StreamableSkeletonProps>;
};
