import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { SignUpSchema } from '@/schemas';

import { signUpAction } from '../actions/sign-up';

import type { z } from 'zod';

type SignUpFormValues = z.infer<typeof SignUpSchema>;

export const useSignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { execute, isPending, result } = useAction(signUpAction, {
    onSuccess: () => {
      form.reset();
      router.push('/dashboard');
    },
    onError: ({ error }) => {
      console.error('Sign up error:', error);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  const fields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email address',
      autoComplete: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      autoComplete: 'new-password',
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
    },
  ];

  return {
    form,
    fields,
    handleSubmit,
    isPending,
    error: result?.serverError || null,
    success: result?.data ? 'Account created successfully!' : null,
  };
};
