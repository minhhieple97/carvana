import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { getAdminClassified } from '@/features/admin/services/classified.service';
import { ClassifiedForm } from '@/features/classifieds/components/classified-form';
import { validateIdSchema } from '@/schemas';

import type { PageProps } from '@/config/types';

export default async function EditClassified(props: PageProps) {
  const params = await props.params;

  const { data, success } = validateIdSchema.safeParse({
    id: Number(params?.id),
  });

  if (!success) redirect(routes.admin.classifieds);

  const classified = await getAdminClassified(data.id);

  if (!classified) redirect(routes.admin.classifieds);

  return <ClassifiedForm classified={classified} />;
}
