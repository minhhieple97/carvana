import { ClassifiedStatus, type Classified, type CurrencyCode, type Prisma } from '@prisma/client';

import type { BadgeProps, Favourites } from '@/config/types';
import type { UpdateClassifiedType } from '@/schemas';

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;

export type ClassifiedCardProps = {
  classified: ClassifiedWithImages;
  favourites: Favourites;
};

export type ClassifiedsListProps = {
  classifiedsPromise: Promise<ClassifiedWithImages[]>;
  favourites: Favourites;
};

export type FormatPriceArgs = {
  price: number | null;
  currency: CurrencyCode | null;
};

export type CardImageProps = {
  image?: {
    src: string;
    blurhash: string;
    alt: string;
  };
  slug: string;
};

export type PriceTagProps = {
  price: number | null;
};

export type CardContentProps = {
  classified: ClassifiedWithImages;
  specifications: Array<{
    id: string;
    icon: React.ReactNode;
    value: string | null;
  }>;
};

export type CardSpecificationsProps = {
  specifications: Array<{
    id: string;
    icon: React.ReactNode;
    value: string | null;
  }>;
};

export type CardActionsProps = {
  slug: string;
};

export type ClassifiedImages = UpdateClassifiedType['images'];

export type ClassifiedKeys = keyof Pick<
  Classified,
  'status' | 'title' | 'vrm' | 'id' | 'views' | 'year' | 'colour' | 'price' | 'createdAt'
>;

export const ClassifiedBadgeMap: Record<ClassifiedStatus, BadgeProps['variant']> = {
  [ClassifiedStatus.DRAFT]: 'secondary',
  [ClassifiedStatus.LIVE]: 'default',
  [ClassifiedStatus.SOLD]: 'destructive',
};
