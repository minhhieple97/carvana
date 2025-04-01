import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubscribeSchema } from '@/app/schemas';
import { subscribeAction } from '@/features/classifieds';

export const useNewsletterForm = () => {
  const [state, formAction, isPending] = useActionState(subscribeAction, {
    success: false,
    message: '',
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
    const valid = await form.trigger();
    if (!valid) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (state.success) {
        form.reset();
        toast.success(state.message || 'Successfully subscribed!');
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, isPending, form]);

  return { form, formAction, formRef, state, handleSubmit };
};
