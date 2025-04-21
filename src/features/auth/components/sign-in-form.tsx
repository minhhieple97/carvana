'use client';

import { AuthForm } from './auth-form';
import { useSignInForm } from '../hooks/useSignInForm';

export const SignInForm = () => {
  const { form, fields, handleSubmit, isPending, error, success } = useSignInForm();

  return (
    <AuthForm
      title="Admin Sign In"
      fields={fields}
      submitButtonText="Sign In"
      footerText={<b>This is for admin only.</b>}
      onSubmit={handleSubmit}
      isPending={isPending}
      error={error}
      success={success}
      form={form}
    />
  );
};
