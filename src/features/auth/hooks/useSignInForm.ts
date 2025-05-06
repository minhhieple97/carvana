import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { routes } from '@/config';
import { SignInSchema } from '@/schemas';

import { signInAction } from '../actions/sign-in';
import { useAuthStore } from '../auth-slice';

import type { z } from 'zod';

type SignInFormValues = z.infer<typeof SignInSchema>;

export const useSignInForm = () => {
  const router = useRouter();
  const { login, setLoading, setError } = useAuthStore();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, isPending, result } = useAction(signInAction, {
    onSuccess: ({ data }) => {
      if (data?.user) {
        login(data.user);
        router.push(routes.admin.dashboard);
      }
    },
    onError: ({ error }) => {
      const errorMessage = error?.serverError || 'Authentication failed';
      setError(errorMessage);
      console.error('Sign in error:', error);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setLoading(true);
    execute(data);
  });

  const fields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your administrator email address',
      autoComplete: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      autoComplete: 'current-password',
    },
  ];

  return {
    form,
    fields,
    handleSubmit,
    isPending,
    error: result?.serverError || null,
    success: result?.data ? 'Sign in successful!' : null,
  };
};
