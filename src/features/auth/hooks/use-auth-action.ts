'use client';

import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';

import { routes } from '@/config';

import { signInAction } from '../actions/sign-in';
import { signUpAction } from '../actions/sign-up';

import type { FormField } from '../types';
import type { FormEvent } from 'react';
export const useSignInAction = () => {
  const router = useRouter();

  const action = useAction(signInAction, {
    onSuccess: () => {
      router.push(routes.admin.dashboard);
    },
    onError: ({ error }) => {
      console.error('Sign in error:', error);
    },
  });

  const fields: FormField[] = [
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    action.execute({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return {
    ...action,
    fields,
    handleSubmit,
    error: action.hasErrored && action.result.serverError ? action.result.serverError : null,
    success: action.result.data ? 'Sign in successful!' : null,
  };
};

export const useSignUpAction = () => {
  const router = useRouter();

  const action = useAction(signUpAction, {
    onSuccess: () => {
      router.push(routes.admin.dashboard);
    },
    onError: ({ error }) => {
      console.error('Sign up error:', error);
    },
  });

  const fields: FormField[] = [
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    action.execute({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });
  };

  return {
    ...action,
    fields,
    handleSubmit,
    error: action.hasErrored && action.result.serverError ? action.result.serverError : null,
    success: action.result.data ? 'Account created successfully!' : null,
  };
};
