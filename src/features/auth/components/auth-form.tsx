'use client';

import { CircleCheckIcon, CircleX, Loader2 } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { Button, Input, Label } from '@/components/ui';

import { OAuthButton } from './oauth-button';

import type { AuthFormProps } from '../types';

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
}: AuthFormProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen m-auto bg-background">
    <div className="max-w-md w-full mx-auto">
      <FormProvider {...form}>
        <form
          className="border-border border shadow-lg p-10 rounded-md bg-card mx-auto"
          onSubmit={onSubmit}
        >
          <div className="flex items-center mb-6 justify-center">
            <h2 className="uppercase text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-foreground">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  {...form.register(field.id)}
                  autoComplete={field.autoComplete}
                  className="placeholder:text-muted-foreground"
                  placeholder={field.placeholder}
                  aria-invalid={!!form.formState.errors[field.id]}
                />
                {form.formState.errors[field.id] && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors[field.id]?.message?.toString()}
                  </p>
                )}
              </div>
            ))}

            {showOAuth && (
              <div className="mt-6 space-y-4">
                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-border" />
                  <span className="relative bg-card px-4 text-sm text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <OAuthButton provider="github" />
              </div>
            )}

            {footerText && (
              <div className="my-6">
                <p className="text-sm text-muted-foreground mb-2 text-center">{footerText}</p>
              </div>
            )}
            <div className="space-y-4">
              <Button disabled={isPending} type="submit" className="w-full uppercase font-bold">
                {isPending && (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin mr-2" aria-hidden="true" />
                )}
                {submitButtonText}
              </Button>
              {success && (
                <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
                  <CircleCheckIcon className="h-5 w-5" />
                  <span>Success! {success}</span>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 rounded-md bg-destructive p-3 text-destructive-foreground">
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
