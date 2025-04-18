'use server';

import { createAI } from 'ai/rsc';
import { ServerMessage, ClientMessage } from '../types';
import { generateClassifiedData } from '../services/ai.service';
import { adminAction } from '@/lib/safe-action';

export const generateClassified = async (image: string): Promise<ClientMessage | null> => {
  return generateClassifiedData(image);
};

export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {
    generateClassified,
  },
});
