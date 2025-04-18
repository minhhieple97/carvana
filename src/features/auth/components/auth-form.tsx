'use client';

import { CircleCheckIcon, CircleX, Github, Loader2 } from 'lucide-react';
import { Button, Input, Label } from '@/components/ui';
import { FormProvider } from 'react-hook-form';
import { oAuthSignIn } from '../actions/sign-in';
import type { AuthFormProps } from '../types';
import type { OAuthProvider } from '@prisma/client';

const SubmitButton = ({ text, isPending }: { text: string; isPending: boolean }) => {
  return (
    <Button disabled={isPending} type="submit" className="w-full uppercase font-bold">
      {isPending && <Loader2 className="h-4 w-4 shrink-0 animate-spin mr-2" aria-hidden="true" />}{' '}
      {text}
    </Button>
  );
};

const OAuthButton = ({ provider }: { provider: OAuthProvider }) => {
  const handleOAuthSignIn = async () => {
    await oAuthSignIn(provider);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleOAuthSignIn}
      className="w-full flex items-center justify-center gap-2"
    >
      {provider === 'github' && <Github className="h-4 w-4" />}
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
};

export const AuthForm = ({
  title,
  fields,
  submitButtonText,
  footerText,
  onSubmit,
  isPending,
  error,
  success,
  form,
  showOAuth = true,
}: AuthFormProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] m-auto bg-white">
      <div className="max-w-md w-full pb-60">
        <FormProvider {...form}>
          <form
            className="border-muted border shadow-lg p-10 rounded-md bg-white"
            onSubmit={onSubmit}
          >
            <div className="flex items-center mb-6 justify-center">
              <h2 className="uppercase text-2xl font-bold">{title}</h2>
            </div>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    {...form.register(field.id)}
                    autoComplete={field.autoComplete}
                    className="placeholder:text-gray-500"
                    placeholder={field.placeholder}
                    aria-invalid={!!form.formState.errors[field.id]}
                  />
                  {form.formState.errors[field.id] && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors[field.id]?.message?.toString()}
                    </p>
                  )}
                </div>
              ))}

              {showOAuth && (
                <div className="mt-6 space-y-4">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inset-x-0 h-px bg-muted" />
                    <span className="relative bg-white px-4 text-sm text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <OAuthButton provider="github" />
                </div>
              )}

              {footerText && (
                <div className="my-6">
                  <p className="text-sm text-gray-600 mb-2 text-center">{footerText}</p>
                </div>
              )}
              <div className="space-y-4">
                <SubmitButton text={submitButtonText} isPending={isPending} />
                {success && (
                  <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
                    <CircleCheckIcon className="h-5 w-5" />
                    <span>Success! {success}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white">
                    <CircleX className="h-5 w-5" />
                    <span>Error! {error}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
