'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { routes } from '@/config';
import { action } from '@/lib/safe-action';

import { toggleFavourite } from '../services/favourites';

const ToggleFavouriteSchema = z.object({
  id: z.number(),
});

export const toggleFavouriteAction = action
  .schema(ToggleFavouriteSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const updatedIds = await toggleFavourite(id);
    revalidatePath(routes.favourites);

    return { ids: updatedIds };
  });
