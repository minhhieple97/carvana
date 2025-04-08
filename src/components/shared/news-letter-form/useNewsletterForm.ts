import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubscribeSchema } from '@/app/schemas';
import { subscribeAction } from '@/features/classifieds';

export const useNewsletterForm = () => {
  const { execute, isPending } = useAction(subscribeAction, {
    onSuccess: (result) => {
      form.reset();
      toast.success(result.data?.message || 'Successfully subscribed!');
    },
    onError: (result) => {
      toast.error(result.error.serverError || 'An error occurred while submitting your details');
    },
  });

  const form = useForm({
    resolver: zodResolver(SubscribeSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await form.trigger();
    if (!valid) return;

    const formData = form.getValues();
    execute(formData);
  };

  return { form, formRef, handleSubmit, isPending };
};
