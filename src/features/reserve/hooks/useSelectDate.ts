import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { SelectDateSchema } from '@/app/schemas/form.schema';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { env } from '@/env';

import type { SelectDateType } from '@/app/schemas/form.schema';
import type { PageProps } from '@/config/types';
import type { Prisma } from '@prisma/client';

export const useSelectDate = (
  searchParams: Awaited<PageProps['searchParams']>,
  classified: Prisma.ClassifiedGetPayload<{
    include: { make: true };
  }>
) => {
  const handoverDate = (searchParams?.handoverDate as string) ?? undefined;
  const handoverTime = (searchParams?.handoverTime as string) ?? undefined;

  const form = useForm<SelectDateType>({
    resolver: zodResolver(SelectDateSchema),
    mode: 'onBlur',
    defaultValues: {
      handoverDate: handoverDate ? decodeURIComponent(handoverDate) : handoverDate,
      handoverTime: handoverTime ? decodeURIComponent(handoverTime) : handoverTime,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set('step', MultiStepFormEnum.WELCOME.toString());
      router.push(url.toString());
    });
  };

  const onSelectDate: SubmitHandler<SelectDateType> = (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) return;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const url = new URL(
        routes.reserve(classified.slug, MultiStepFormEnum.SUBMIT_DETAILS),
        env.NEXT_PUBLIC_APP_URL
      );

      url.searchParams.set('handoverDate', encodeURIComponent(data.handoverDate));
      url.searchParams.set('handoverTime', encodeURIComponent(data.handoverTime));

      router.push(url.toString());
    });
  };

  return {
    form,
    isPending,
    isPrevPending,
    prevStep,
    onSelectDate,
  };
};
