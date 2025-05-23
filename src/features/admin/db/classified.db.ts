import { prisma } from '@/lib/prisma';

import type {
  CreateClassifiedDbInput,
  UpdateClassifiedDbInput,
  UpdateClassifiedImagesInput,
} from '../types';
import type { ClassifiedStatus } from '@prisma/client';

export const findMakeById = (id: number) => prisma.make.findUnique({ where: { id } });

export const findModelById = (id: number) => prisma.model.findUnique({ where: { id } });

export const findModelVariantById = (id: number) =>
  prisma.modelVariant.findUnique({ where: { id } });

export const countClassifiedsWithSlugLike = (slug: string) =>
  prisma.classified.count({
    where: { slug: { contains: slug, mode: 'insensitive' } },
  });

export const findClassifiedById = (id: number) => prisma.classified.findUnique({ where: { id } });

export const findClassifiedWithImagesById = (id: number) =>
  prisma.classified.findUnique({ where: { id }, include: { images: true } });

export const createClassifiedWithImages = (data: CreateClassifiedDbInput) => {
  const { images, ...classifiedData } = data;
  return prisma.classified.create({
    data: {
      ...classifiedData,
      images: {
        create: images,
      },
    },
  });
};

export const updateClassifiedAndImages = async (
  id: number,
  updateData: Omit<UpdateClassifiedDbInput, 'images' | 'price'> & { price: number },
  imagesData: UpdateClassifiedImagesInput[]
) =>
  prisma.$transaction(
    async (tx) => {
      await tx.image.deleteMany({
        where: { classifiedId: id },
      });

      await tx.image.createMany({
        data: imagesData.map((img) => ({ ...img, classifiedId: id })),
      });

      const createdImages = await tx.image.findMany({
        where: { classifiedId: id },
        select: { id: true },
      });

      const updatedClassified = await tx.classified.update({
        where: { id },
        data: {
          ...updateData,
          images: {
            set: createdImages,
          },
        },
        include: { images: true },
      });

      return { classified: updatedClassified, images: updatedClassified.images };
    },
    { timeout: 10000 } // Keep transaction timeout
  );

export const deleteClassifiedById = (id: number) => prisma.classified.delete({ where: { id } });

export const findClassifiedsWithFilter = async ({
  query,
  status,
  sort,
  order,
  skip,
  take,
}: {
  query?: string | undefined;
  status?: string | undefined;
  sort: string;
  order: 'asc' | 'desc';
  skip: number;
  take: number;
}) => {
  const where = {
    ...(query && { title: { contains: query, mode: 'insensitive' as const } }),
    ...(status && status !== 'ALL' && { status: status as ClassifiedStatus }),
  };

  return prisma.classified.findMany({
    where,
    orderBy: { [sort]: order },
    include: { images: { take: 1 } },
    skip,
    take,
  });
};

export const countClassifiedsWithFilter = async ({
  query,
  status,
}: {
  query?: string | undefined;
  status?: string | undefined;
}) =>
  prisma.classified.count({
    where: {
      ...(query && { title: { contains: query, mode: 'insensitive' as const } }),
      ...(status && status !== 'ALL' && { status: status as ClassifiedStatus }),
    },
  });
