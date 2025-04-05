import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubmitDetailsSchema } from '@/app/schemas/customer.schema';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { formatDate } from '@/lib/utils';

import { createCustomerAction } from '../actions';

import type { SubmitDetailsSchemaType } from '@/app/schemas/customer.schema';
import type { AwaitedPageProps } from '@/config/types';

export const useSubmitDetails = (
  params: AwaitedPageProps['params'],
  searchParams: AwaitedPageProps['searchParams']
) => {
  const router = useRouter();
  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      terms: 'false',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set('step', MultiStepFormEnum.SELECT_DATE.toString());
      router.push(url.toString());
    });
  };

  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) return;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const handoverDate = decodeURIComponent(searchParams?.handoverDate as string);
      const handoverTime = decodeURIComponent(searchParams?.handoverTime as string);
      const date = formatDate(handoverDate, handoverTime);

      const { success, message } = await createCustomerAction({
        slug: params?.slug as string,
        date,
        ...data,
      });

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);

      setTimeout(() => {
        router.push(routes.success(params?.slug as string));
      }, 1000);
    });
  };

  return {
    form,
    isPending,
    isPrevPending,
    prevStep,
    onSubmitDetails,
  };
};
