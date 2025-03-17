import { cookies } from 'next/headers';

import 'server-only';
import { SOURCE_ID_KEY } from '@/config/constants';

export async function getSourceId() {
  const cookieStore = await cookies();
  return cookieStore.get(SOURCE_ID_KEY)!.value;
}
