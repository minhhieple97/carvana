import { createOpenAI } from '@ai-sdk/openai';
import { type CoreMessage, type UserContent, generateObject } from 'ai';
import { createStreamableUI, createStreamableValue } from 'ai/rsc';

import { env } from '@/env';
import {
  ClassifiedDetailsAISchema,
  ClassifiedTaxonomyAISchema,
} from '@/schemas/classified-ai.schema';

import { StreamableSkeleton } from '../components/streamable-skeleton';

import { mapToTaxonomyOrCreate } from './index';

import type { StreamableSkeletonProps } from '../types';
import { findMakeByName } from '../db/taxonomy.db';

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict',
  baseURL: env.OPENAI_BASE_URL,
});

export async function generateClassifiedData(image: string) {
  const uiStream = createStreamableUI();
  const valueStream = createStreamableValue<StreamableSkeletonProps>();

  let classified = { image } as StreamableSkeletonProps;

  uiStream.update(<StreamableSkeleton {...classified} />);

  try {
    const taxonomyData = await generateTaxonomyData(image);

    classified.title = formatTitle(taxonomyData);

    const foundTaxonomy = await mapToTaxonomyOrCreate({
      year: taxonomyData.year,
      make: taxonomyData.make,
      model: taxonomyData.model,
      modelVariant: taxonomyData.modelVariant,
    });

    if (foundTaxonomy) {
      const make = await findMakeByName(foundTaxonomy.make);

      if (make) {
        classified = {
          ...classified,
          ...foundTaxonomy,
          make,
          makeId: make.id,
        };
      }
    }

    uiStream.update(<StreamableSkeleton {...classified} />);

    const details = await generateVehicleDetails(image, classified.title || '');

    classified = {
      ...classified,
      ...details,
    };

    uiStream.update(<StreamableSkeleton done {...classified} />);
  } catch (error) {
    console.error('Error generating classified data:', error);
  } finally {
    valueStream.update(classified);
    uiStream.done();
    valueStream.done();
  }

  return {
    id: Date.now(),
    display: uiStream.value,
    role: 'assistant' as const,
    classified: valueStream.value,
  };
}

async function generateTaxonomyData(image: string) {
  const { object: taxonomy } = await generateObject({
    model: openai(env.OPENAI_MODEL, { structuredOutputs: true }),

    schema: ClassifiedTaxonomyAISchema,
    system:
      'You are an expert at analysing images of vehicles and responding with a structured JSON object based on the schema provided',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', image },
          {
            type: 'text',
            text: 'You are tasked with returning the structured data for the vehicle in the image attached.',
          },
        ],
      },
    ] as CoreMessage[],
  });

  return taxonomy;
}

async function generateVehicleDetails(image: string, title: string) {
  const { object: details } = await generateObject({
    model: openai(env.OPENAI_MODEL, { structuredOutputs: true }),
    schema: ClassifiedDetailsAISchema,
    system: 'You are an expert at writing vehicle descriptions and generating structured data',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', image },
          {
            type: 'text',
            text: `Based on the image provided, you are tasked with determining the odometer reading, doors, seats, ULEZ compliance, transmission, colour, fuel type, body type, drive type, VRM and any addition details in the schema provided for the ${title}. You must be accurate when determining the values for these properties even if the image is not clear.`,
          },
        ],
      },
    ] as CoreMessage[],
  });

  return details;
}

function formatTitle(taxonomy: {
  year: number;
  make: string;
  model: string;
  modelVariant?: string | null;
}) {
  return `${taxonomy.year} ${taxonomy.make} ${taxonomy.model}${taxonomy.modelVariant ? ` ${taxonomy.modelVariant}` : ''}`.trim();
}
