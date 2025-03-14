import { Prisma } from '@prisma/client';

type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;

type ClassifiedCardProps = {
  classified: ClassifiedWithImages;
};

type ClassifiedsListProps = {
  classifieds: ClassifiedWithImages[];
};

export type { ClassifiedWithImages, ClassifiedCardProps, ClassifiedsListProps };
