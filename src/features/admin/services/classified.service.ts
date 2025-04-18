import { randomInt } from 'node:crypto';

import {
  Colour,
  BodyType,
  FuelType,
  OdoUnit,
  CurrencyCode,
  Transmission,
  ULEZCompliance,
  Prisma,
} from '@prisma/client';
import slugify from 'slugify';
import { createPngDataUri } from 'unlazy/thumbhash';

import { ActionError } from '@/lib/safe-action';
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server';

import {
  findMakeById,
  findModelById,
  findModelVariantById,
  countClassifiedsWithSlugLike,
  createClassifiedWithImages,
  updateClassifiedAndImages,
  deleteClassifiedById as deleteClassifiedDb,
} from '../db/classified.db';
import { findMakeByName } from '../db/taxonomy.db';
import { findOrCreateModel } from '../db/taxonomy.db';
import { findOrCreateModelVariant } from '../db/taxonomy.db';

import type {
  CreateClassifiedDbInput,
  MappedTaxonomyOutput,
  MapToTaxonomyInput,
  UpdateClassifiedDbInput,
  UpdateClassifiedImagesInput,
} from '../types';
import type { CreateClassifiedType, UpdateClassifiedType } from '@/schemas/classified.schema';
import type { ModelVariant } from '@prisma/client';

export const createClassified = async (data: CreateClassifiedType): Promise<number> => {
  const make = await findMakeById(data.makeId);
  if (!make) throw new ActionError(`Make with ID ${data.makeId} not found.`);

  const model = await findModelById(data.modelId);
  if (!model) throw new ActionError(`Model with ID ${data.modelId} not found.`);

  let title = `${data.year} ${make.name} ${model.name}`;

  if (data?.modelVariantId) {
    const modelVariant = await findModelVariantById(data.modelVariantId);
    if (modelVariant) {
      title = `${title} ${modelVariant.name}`;
    }
  }

  const slugInput = `${title} ${data.vrm ?? randomInt(100000, 999999)}`;
  let slug = slugify(slugInput);

  const slugLikeCount = await countClassifiedsWithSlugLike(slug);
  if (slugLikeCount > 0) {
    slug = slugify(`${title} ${data.vrm ?? ''} ${slugLikeCount + 1}`);
  }

  const thumbhash = await generateThumbHashFromSrcUrl(data.image);
  const uri = createPngDataUri(thumbhash);

  const classifiedDbData: CreateClassifiedDbInput = {
    slug,
    title,
    year: data.year,
    makeId: data.makeId,
    modelId: data.modelId,
    ...(data.modelVariantId && { modelVariantId: data.modelVariantId }),
    vrm: data?.vrm ? data.vrm : null,
    price: 0, // Default price
    currency: CurrencyCode.GBP,
    odoReading: data.odoReading ?? 0,
    odoUnit: data.odoUnit ?? OdoUnit.MILES,
    fuelType: data.fuelType ?? FuelType.PETROL,
    bodyType: data.bodyType ?? BodyType.SEDAN,
    colour: data.colour ?? Colour.BLACK,
    transmission: data.transmission ?? Transmission.MANUAL,
    ulezCompliance: data.ulezCompliance ?? ULEZCompliance.EXEMPT,
    description: data.description ?? null,
    doors: data.doors ?? 0,
    seats: data.seats ?? 0,
    images: [
      {
        isMain: true,
        blurhash: uri,
        src: data.image,
        alt: title,
      },
    ],
  };

  try {
    const classified = await createClassifiedWithImages(classifiedDbData);
    return classified.id;
  } catch (error) {
    console.error('Service Error [createClassified]:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ActionError('A classified with this VRM or title/slug already exists.');
    }
    throw new ActionError('Database error during classified creation.');
  }
};

export const updateClassified = async (data: UpdateClassifiedType): Promise<boolean> => {
  const makeId = Number(data.make);
  const modelId = Number(data.model);
  const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null;

  const make = await findMakeById(makeId);
  if (!make) throw new ActionError(`Make with ID ${makeId} not found.`);

  const model = await findModelById(modelId);
  if (!model) throw new ActionError(`Model with ID ${modelId} not found.`);

  let title = `${data.year} ${make.name} ${model.name}`;

  if (modelVariantId) {
    const modelVariant = await findModelVariantById(modelVariantId);
    if (modelVariant) {
      title = `${title} ${modelVariant.name}`;
    } else {
      console.warn(`ModelVariant with ID ${modelVariantId} not found during update.`);
    }
  }

  const slug = slugify(`${title} ${data.vrm ?? ''}`);

  const imagesDbData: UpdateClassifiedImagesInput[] = await Promise.all(
    data.images.map(async ({ src, alt }, index) => {
      const hash = await generateThumbHashFromSrcUrl(src);
      const uri = createPngDataUri(hash);
      return {
        isMain: index === 0,
        blurhash: uri,
        src,
        alt: alt ?? `${title} image ${index + 1}`,
      };
    })
  );

  const updateDbPayload: Omit<UpdateClassifiedDbInput, 'images' | 'price'> & { price: number } = {
    slug,
    title,
    year: Number(data.year),
    makeId,
    modelId,
    ...(modelVariantId && { modelVariantId }),
    vrm: data.vrm,
    price: data.price * 100,
    currency: data.currency,
    odoReading: data.odoReading,
    odoUnit: data.odoUnit,
    fuelType: data.fuelType,
    bodyType: data.bodyType,
    transmission: data.transmission,
    colour: data.colour,
    ulezCompliance: data.ulezCompliance,
    description: data.description,
    doors: data.doors,
    seats: data.seats,
    status: data.status,
  };

  try {
    await updateClassifiedAndImages(data.id, updateDbPayload, imagesDbData);
    return true;
  } catch (error) {
    console.error('Service Error [updateClassified]:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ActionError('Classified not found.');
    }
    throw new ActionError('Database error during classified update.');
  }
};

export const deleteClassified = async (id: number): Promise<boolean> => {
  try {
    await deleteClassifiedDb(id);
    return true;
  } catch (error) {
    console.error('Service Error [deleteClassified]:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ActionError('Classified not found or already deleted.');
    }
    throw new ActionError('Database error during classified deletion.');
  }
};

export const mapToTaxonomyOrCreate = async ({
  year,
  make: makeName,
  model: modelName,
  modelVariant: modelVariantName,
}: MapToTaxonomyInput): Promise<MappedTaxonomyOutput> => {
  const make = await findMakeByName(makeName);

  const model = await findOrCreateModel(make.id, modelName);

  let resolvedModelVariant: ModelVariant | null = null;
  if (modelVariantName) {
    resolvedModelVariant = await findOrCreateModelVariant(model.id, modelVariantName, year);
  }

  return {
    year: year,
    make: make.name,
    model: model.name,
    modelVariant: resolvedModelVariant?.name ?? null,
    makeId: make.id,
    modelId: model.id,
    modelVariantId: resolvedModelVariant?.id ?? null,
  };
};
