import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
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
  const requestIdRef = useRef<string>(nanoid());
  const isSubmittingRef = useRef<boolean>(false);

  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      terms: false,
      requestId: requestIdRef.current,
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
    if (isSubmittingRef.current) {
      toast.info('Your reservation is being processed. Please wait...');
      return;
    }

    startTransition(async () => {
      try {
        isSubmittingRef.current = true;

        const result = SubmitDetailsSchema.safeParse(data);
        if (!result.success) {
          const errorMessages = result.error.errors.map((err) => err.message).join(', ');
          toast.error(errorMessages || 'Please fill in all required fields correctly');
          isSubmittingRef.current = false;
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
          isSubmittingRef.current = false;
          return;
        }

        const valid = await form.trigger();
        if (!valid) {
          toast.error('Please fill in all required fields correctly');
          isSubmittingRef.current = false;
          return;
        }

        if (!data.terms) {
          toast.error('You must agree to the terms and conditions');
          isSubmittingRef.current = false;
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const date = formatDate(handoverDate!, handoverTime!);

        const { success, message } = await createCustomerAction({
          slug: params?.slug as string,
          date,
          ...data,
          requestId: requestIdRef.current,
        });

        if (!success) {
          toast.error(message);
          isSubmittingRef.current = false;
          return;
        }

        toast.success(message);

        setTimeout(() => {
          router.push(routes.success(params?.slug as string));
        }, 1000);
      } catch (error) {
        console.error('Submit details error:', error);
        toast.error('An error occurred while submitting your details');
        isSubmittingRef.current = false;
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
