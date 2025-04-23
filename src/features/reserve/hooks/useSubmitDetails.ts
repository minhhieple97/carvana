import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { formatDate, isValidHandoverDateTime } from '@/lib/utils';
import { SubmitDetailsSchema } from '@/schemas/customer.schema';

import type { AwaitedPageProps } from '@/config/types';
import type { SubmitDetailsSchemaType } from '@/schemas/customer.schema';

import { createCustomerAction } from '@/features/customers/actions';

export const useSubmitDetails = (
  params: AwaitedPageProps['params'],
  searchParams: AwaitedPageProps['searchParams']
) => {
  const router = useRouter();
  const requestIdRef = useRef<string>(nanoid());

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

  const { executeAsync, isPending } = useAction(createCustomerAction, {
    onSuccess: () => {
      router.push(routes.success(params?.slug as string));
    },
    onError: (error) => {
      console.error('Submit details error:', error);
      toast.error(error.error.serverError || 'An error occurred while submitting your details');
    },
  });

  const prevStep = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const url = new URL(window.location.href);
    url.searchParams.set('step', MultiStepFormEnum.SELECT_DATE.toString());
    router.push(url.toString());
  };

  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = async (data) => {
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const date = formatDate(handoverDate!, handoverTime!);

    await executeAsync({
      slug: params?.slug as string,
      date,
      ...data,
      requestId: requestIdRef.current,
    });
  };

  return {
    form,
    isPending,
    prevStep,
    onSubmitDetails,
  };
};
