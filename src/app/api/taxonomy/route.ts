import { type NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib';

import type { Make, Model, ModelVariant } from '@prisma/client';

type LabelValue = {
  label: string;
  value: string;
};

type TaxonomyResponse = {
  makes: LabelValue[];
  models: LabelValue[];
  modelVariants: LabelValue[];
};

const toLabelValue = (items: Array<{ id: number; name: string }>): LabelValue[] =>
  items.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

const fetchMakes = async () =>
  prisma.make.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

const fetchModels = async (makeId: string | null): Promise<Model[]> => {
  if (!makeId) return [];

  return prisma.model.findMany({
    where: {
      make: { id: Number(makeId) },
    },
    orderBy: { name: 'asc' },
  });
};

const fetchModelVariants = async (
  makeId: string | null,
  modelId: string | null
): Promise<ModelVariant[]> => {
  if (!makeId || !modelId) return [];

  return prisma.modelVariant.findMany({
    where: {
      model: { id: Number(modelId) },
    },
    orderBy: { name: 'asc' },
  });
};

export const GET = async (req: NextRequest) => {
  try {
    const params = new URL(req.url).searchParams;
    const makeId = params.get('make');
    const modelId = params.get('model');

    const [makes, models, modelVariants] = await Promise.all([
      fetchMakes(),
      fetchModels(makeId),
      fetchModelVariants(makeId, modelId),
    ]);

    const response: TaxonomyResponse = {
      makes: toLabelValue(makes),
      models: toLabelValue(models),
      modelVariants: toLabelValue(modelVariants),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Taxonomy API Error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
