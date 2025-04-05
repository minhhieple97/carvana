import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubmitDetailsSchema } from '@/app/schemas/customer.schema';
import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { formatDate, isValidHandoverDateTime } from '@/lib/utils';

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
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      terms: false,
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
      try {
        const result = SubmitDetailsSchema.safeParse(data);
        if (!result.success) {
          const errorMessages = result.error.errors.map((err) => err.message).join(', ');
          toast.error(errorMessages || 'Please fill in all required fields correctly');
          return;
        }

        const handoverDate = searchParams?.handoverDate
          ? decodeURIComponent(searchParams.handoverDate as string)
          : undefined;
        const handoverTime = searchParams?.handoverTime
          ? decodeURIComponent(searchParams.handoverTime as string)
          : undefined;

        const dateTimeValidation = isValidHandoverDateTime(handoverDate, handoverTime);
        if (!dateTimeValidation.isValid) {
          toast.error(dateTimeValidation.error || 'Invalid handover date or time');
          const url = new URL(window.location.href);
          url.searchParams.set('step', MultiStepFormEnum.SELECT_DATE.toString());
          router.push(url.toString());
          return;
        }

        const valid = await form.trigger();
        if (!valid) {
          toast.error('Please fill in all required fields correctly');
          return;
        }

        if (!data.terms) {
          toast.error('You must agree to the terms and conditions');
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const date = formatDate(handoverDate!, handoverTime!);

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
      } catch (error) {
        console.error('Submit details error:', error);
        toast.error('An error occurred while submitting your details');
      }
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
