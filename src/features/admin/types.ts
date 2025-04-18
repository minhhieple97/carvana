import type { ClassifiedAI } from '@/schemas/classified-ai.schema';
import type { Prisma } from '@prisma/client';
import type { Make } from '@prisma/client';

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

// --- Moved Types from classified.types.ts ---

// Type for creating images within classified creation
export type CreateClassifiedImageDbInput = Omit<Prisma.ImageUncheckedCreateInput, 'classifiedId'>;

// Type for the data needed by the createClassified db function
export type CreateClassifiedDbInput = Omit<
  Prisma.ClassifiedUncheckedCreateInput,
  'id' | 'createdAt' | 'updatedAt' | 'images' | 'price' // Price handled separately or defaulted
> & {
  price: number; // Ensure price is number (pennies/cents)
  images: CreateClassifiedImageDbInput[]; // Renamed type for clarity
};

// Type for updating images within classified update
export type UpdateClassifiedImagesInput = Omit<
  Prisma.ImageUncheckedCreateInput,
  'classifiedId' | 'id'
>;

// Type for the data needed by the updateClassified db function (excluding images array)
export type UpdateClassifiedDbInput = Omit<
  Prisma.ClassifiedUncheckedUpdateInput,
  'id' | 'createdAt' | 'updatedAt' | 'images' | 'price' // Price handled separately
> & {
  price: number; // Ensure price is number (pennies/cents)
};
// --- End of Moved Types ---
