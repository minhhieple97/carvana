import { Favourites } from '@/config/types';
import { CurrencyCode, Prisma } from '@prisma/client';

type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;

type ClassifiedCardProps = {
  classified: ClassifiedWithImages;
  favourites: Favourites;
};

type ClassifiedsListProps = {
  classifieds: ClassifiedWithImages[];
  favourites: Favourites;
};

export type { ClassifiedWithImages, ClassifiedCardProps, ClassifiedsListProps };

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
