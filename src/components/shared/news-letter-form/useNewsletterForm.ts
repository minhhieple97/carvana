import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useEffect } from 'react';
import { subscribeAction } from '@/features/classifieds';
import { SubscribeSchema } from '@/app/schemas';

export const useNewsletterForm = () => {
  const [state, formAction] = useActionState(subscribeAction, {
    success: false,
    message: '',
  });

  const form = useForm({
    resolver: zodResolver(SubscribeSchema),
    mode: 'onChange',
  });

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger();
    if (!valid) return;
    formAction(formData);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return { form, handleFormAction, formRef, state };
};
