'use client';

import { AuthForm } from './auth-form';
import { useSignInForm } from '../hooks/useSignInForm';

export const SignInForm = () => {
  const { form, fields, handleSubmit, isPending, error, success } = useSignInForm();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-auto bg-background">
      <AuthForm.Wrapper form={form}>
        <AuthForm.Container onSubmit={handleSubmit}>
          <AuthForm.Header>Admin Sign In</AuthForm.Header>
          <AuthForm.Fields fields={fields} form={form} />

          <AuthForm.Footer>
            <b>This is for admin only.</b>
          </AuthForm.Footer>

          <div className="space-y-4">
            <AuthForm.Submit isPending={isPending}>Sign In</AuthForm.Submit>
          </div>
        </AuthForm.Container>
      </AuthForm.Wrapper>
    </div>
  );
};
