import { ClassifiedStatus } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { getSingleClassified } from '@/features/classifieds';
import { ClassifiedView } from '@/features/classifieds/components/classified-view';

import type { PageProps } from '@/config/types';
export default async function ClassifiedPage(props: PageProps) {
  const params = await props?.params;
  const slug = decodeURIComponent(params?.slug as string);
  if (!slug) notFound();

  const classified = await getSingleClassified(slug);

  if (!classified) notFound();

  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(classified.slug));
  }

  return <ClassifiedView {...classified} />;
}
