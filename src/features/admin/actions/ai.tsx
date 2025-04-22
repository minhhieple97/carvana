'use server';

import { createAI } from 'ai/rsc';

import { generateClassifiedData } from '../services/ai.service';

import type { ServerMessage, ClientMessage } from '../types';

export const generateClassified = async (image: string): Promise<ClientMessage | null> =>
  generateClassifiedData(image);

export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {
    generateClassified,
  },
});
