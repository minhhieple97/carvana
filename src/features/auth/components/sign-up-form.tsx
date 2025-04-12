'use client';

import Link from 'next/link';

import { AuthForm } from './auth-form';
import { useSignUpForm } from '../hooks/useSignUpForm';

export const SignUpForm = () => {
  const { form, fields, handleSubmit, isPending, error, success } = useSignUpForm();

  return (
    <AuthForm
      title="Sign Up"
      fields={fields}
      submitButtonText="Create Account"
      footerText={
        <>
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </>
      }
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
      form={form}
    />
  );
};
