import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { env } from '@/env';
import { generateDateOptions, getTimeOptions } from '@/lib/utils';
import { SelectDateSchema } from '@/schemas/form.schema';

import type { PageProps } from '@/config/types';
import type { SelectDateType } from '@/schemas/form.schema';
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
      handoverDate: handoverDate ? decodeURIComponent(handoverDate) : '',
      handoverTime: handoverTime ? decodeURIComponent(handoverTime) : '',
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const [selectedDate, setSelectedDate] = useState<string>(
    handoverDate ? decodeURIComponent(handoverDate) : ''
  );

  const dateOptions = generateDateOptions();

  const [timeOptions, setTimeOptions] = useState(() => getTimeOptions(selectedDate));

  const watchedDate = form.watch('handoverDate');

  useEffect(() => {
    setSelectedDate(watchedDate);
    setTimeOptions(getTimeOptions(watchedDate));

    if (watchedDate) {
      const currentValue = form.getValues('handoverTime');
      const isValidOption = getTimeOptions(watchedDate).some(
        (option) => option.value === currentValue
      );

      if (currentValue && !isValidOption) {
        form.setValue('handoverTime', '');
      }
    }
  }, [watchedDate, form]);

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
      try {
        const result = SelectDateSchema.safeParse(data);

        if (!result.success) {
          const errorMessages = result.error.errors.map((err) => err.message).join(', ');
          toast.error(errorMessages || 'Please select valid date and time');
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const url = new URL(
          routes.reserve(classified.slug, MultiStepFormEnum.SUBMIT_DETAILS),
          env.NEXT_PUBLIC_APP_URL
        );

        url.searchParams.set('handoverDate', encodeURIComponent(result.data.handoverDate));
        url.searchParams.set('handoverTime', encodeURIComponent(result.data.handoverTime));

        router.push(url.toString());
      } catch (error) {
        console.error('Date selection error:', error);
        toast.error('An error occurred while processing your selection');
      }
    });
  };

  return {
    form,
    isPending,
    isPrevPending,
    prevStep,
    onSelectDate,
    dateOptions,
    timeOptions,
  };
};
