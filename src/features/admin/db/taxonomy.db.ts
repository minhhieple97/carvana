import { prisma } from '@/lib/prisma';

import type { Make, Model, ModelVariant } from '@prisma/client';

export const findMakeByName = async (makeName: string): Promise<Make> => {
  const make = await prisma.make.findFirst({
    where: { name: { equals: makeName, mode: 'insensitive' } },
  });

  if (!make) {
    throw new Error(`Make "${makeName}" not found.`);
  }
  return make;
};

export const findOrCreateModel = async (makeId: number, modelName: string): Promise<Model> => {
  let model = await prisma.model.findFirst({
    where: {
      makeId,
      name: { contains: modelName, mode: 'insensitive' },
    },
  });

  if (!model) {
    try {
      model = await prisma.$transaction(async (tx) => {
        const existingModel = await tx.model.findFirst({
          where: {
            makeId,
            name: { contains: modelName, mode: 'insensitive' },
          },
        });

        if (existingModel) {
          return existingModel;
        }

        return tx.model.create({
          data: {
            name: modelName,
            makeId,
          },
        });
      });
    } catch (error) {
      console.error(`Failed to find or create model "${modelName}" for makeId ${makeId}:`, error);

      throw new Error(`Could not find or create model "${modelName}".`);
    }
  }

  if (!model) {
    console.error(`Model is unexpectedly null after find/create attempt for "${modelName}".`);
    throw new Error(`Model "${modelName}" could not be resolved.`);
  }

  return model;
};

export const findOrCreateModelVariant = async (
  modelId: number,
  modelVariantName: string,
  year: number
): Promise<ModelVariant> => {
  let modelVariant = await prisma.modelVariant.findFirst({
    where: {
      modelId,
      name: { contains: modelVariantName, mode: 'insensitive' },
    },
  });

  if (!modelVariant) {
    try {
      modelVariant = await prisma.$transaction(async (tx) => {
        const existingVariant = await tx.modelVariant.findFirst({
          where: {
            modelId,
            name: { contains: modelVariantName, mode: 'insensitive' },
          },
        });

        if (existingVariant) {
          return existingVariant;
        }

        return tx.modelVariant.create({
          data: {
            name: modelVariantName,
            modelId,
            yearStart: year,
            yearEnd: year,
          },
        });
      });
    } catch (error) {
      console.error(
        `Failed to find or create model variant "${modelVariantName}" for modelId ${modelId}:`,
        error
      );
      throw new Error(`Could not find or create model variant "${modelVariantName}".`);
    }
  }

  if (!modelVariant) {
    console.error(
      `ModelVariant is unexpectedly null after find/create attempt for "${modelVariantName}".`
    );
    throw new Error(`Model Variant "${modelVariantName}" could not be resolved.`);
  }

  return modelVariant;
};
