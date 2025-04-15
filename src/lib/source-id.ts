'use server';
import { cookies } from 'next/headers';

import { SOURCE_ID_KEY } from '@/config/constants';

export const getSourceId = async () => {
  const cookieStore = await cookies();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return cookieStore.get(SOURCE_ID_KEY)!.value;
};
