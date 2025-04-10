import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { routes } from '@/config';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';
import { validateIdSchema } from '@/schemas';

import type { Favourites } from '@/config';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { data, error } = validateIdSchema.safeParse(body);

  if (!data) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  if (typeof data.id !== 'number') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const sourceId = await getSourceId();

  const storedFavourites = await redis.get<Favourites>(sourceId);
  const favourites: Favourites = storedFavourites || { ids: [] };

  if (favourites.ids.includes(data.id)) {
    favourites.ids = favourites.ids.filter((favId) => favId !== data.id);
  } else {
    favourites.ids.push(data.id);
  }

  await redis.set(sourceId, favourites);

  revalidatePath(routes.favourites);

  return NextResponse.json({ ids: favourites.ids }, { status: 200 });
};
