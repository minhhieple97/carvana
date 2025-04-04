import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { MultiStepFormEnum } from '@/config/types';

export const useWelcome = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextStep = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set('step', MultiStepFormEnum.SELECT_DATE.toString());
      router.push(url.toString());
    });
  };

  return {
    isPending,
    nextStep,
  };
};
