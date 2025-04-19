import { CurrencyCode } from '@prisma/client';
import { ClassifiedStatus } from '@prisma/client';
import { OdoUnit, BodyType } from '@prisma/client';
import { FuelType, Colour } from '@prisma/client';
import { ULEZCompliance } from '@prisma/client';
import { Transmission } from '@prisma/client';
import { z } from 'zod';

export const ClassifiedFilterSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  odoUnit: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  colour: z.string().optional(),
  doors: z.string().optional(),
  seats: z.string().optional(),
  ulezCompliance: z.string().optional(),
});

export const CreateClassifiedSchema = z.object({
  makeId: z.number({ required_error: 'Make is required' }),
  modelId: z.number({ required_error: 'Model is required' }),
  modelVariantId: z.number().optional(),
  year: z.number({ required_error: 'Year is required' }),
  image: z.string().url({ message: 'Valid image URL is required' }),
  description: z.string().optional(),
  vrm: z.string().optional(),
  odoReading: z.number().optional(),
  doors: z.number().min(1).max(8).optional(),
  seats: z.number().min(1).max(12).optional(),
  ulezCompliance: z.nativeEnum(ULEZCompliance).optional(),
  transmission: z.nativeEnum(Transmission).optional(),
  colour: z.nativeEnum(Colour).optional(),
  fuelType: z.nativeEnum(FuelType).optional(),
  bodyType: z.nativeEnum(BodyType).optional(),
  odoUnit: z.nativeEnum(OdoUnit).optional(),
});

export type CreateClassifiedType = z.infer<typeof CreateClassifiedSchema>;

export const updateClassifiedSchema = z.object({
  id: z.number(),
  year: z.string(),
  make: z.number(),
  model: z.number(),
  modelVariant: z.string().optional(),
  description: z.string().nullable(),
  vrm: z.string().nullable(),
  odoReading: z.number(),
  doors: z.number().min(1).max(8),
  seats: z.number().min(1).max(12),
  ulezCompliance: z.nativeEnum(ULEZCompliance, {
    message: 'Invalid ULEZ Compliance',
  }),
  transmission: z.nativeEnum(Transmission, { message: 'Invalid Transmission' }),
  colour: z.nativeEnum(Colour, { message: 'Invalid Colour' }),
  fuelType: z.nativeEnum(FuelType, { message: 'Invalid Fuel Type' }),
  bodyType: z.nativeEnum(BodyType, { message: 'Invalid Body Type' }),
  odoUnit: z.nativeEnum(OdoUnit, { message: 'Invalid Odo Unit' }),
  status: z.nativeEnum(ClassifiedStatus),
  currency: z.nativeEnum(CurrencyCode, { message: 'Invalid Currency Code' }),
  price: z.number(),
  images: z
    .array(
      z.object({
        id: z.number().optional(),
        src: z.string().url(),
        alt: z.string().optional(),
        uuid: z.string().uuid().optional(),
        base64: z.string().optional(),
        done: z.boolean().optional(),
      })
    )
    .min(1, { message: 'At least one image is required' }),
});

export type UpdateClassifiedType = z.infer<typeof updateClassifiedSchema>;

export const DeleteClassifiedSchema = z.object({
  id: z.number(),
});

export type DeleteClassifiedType = z.infer<typeof DeleteClassifiedSchema>;
