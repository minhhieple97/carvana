import { notFound } from 'next/navigation';

import { MultiStepFormEnum, type PageProps } from '@/config/types';
import { SelectDate, SubmitDetails, Welcome } from '@/features/reserve';
import { prisma } from '@/lib/prisma';
import { MultiStepFormSchema } from '@/schemas/form.schema';

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: Welcome,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

export default async function ReservePage(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params?.slug;
  const step = searchParams?.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug,
    step: Number(step),
  });

  if (!success) {
    console.error({ error });
    notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: { slug: data.slug },
    include: { make: true },
  });

  if (!classified) notFound();

  const Component = MAP_STEP_TO_COMPONENT[data.step];

  return <Component searchParams={searchParams} params={params} classified={classified} />;
}
