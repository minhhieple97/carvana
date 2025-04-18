import { routes } from '@/config/routes';
import type { PageProps } from '@/config/types';
import { ClassifiedForm } from '@/features/classifieds/components/classified-form';
import { prisma } from '@/lib/prisma';
import { validateIdSchema } from '@/schemas';
import { redirect } from 'next/navigation';

export default async function EditClassified(props: PageProps) {
  const params = await props.params;

  const { data, success } = validateIdSchema.safeParse({
    id: Number(params?.id),
  });

  if (!success) redirect(routes.admin.classifieds);

  const classified = await prisma.classified.findUnique({
    where: { id: data.id },
    include: { images: true },
  });

  if (!classified) redirect(routes.admin.classifieds);

  return <ClassifiedForm classified={classified} />;
}
