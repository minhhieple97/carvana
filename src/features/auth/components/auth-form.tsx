'use client';

import { ReactNode } from 'react';
import { CircleCheckIcon, CircleX, Loader2 } from 'lucide-react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Button, Input, Label } from '@/components/ui';

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
};

const AuthFormHeader = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center mb-6 justify-center">
    <h2 className="uppercase text-xl md:text-2xl font-bold text-foreground">{children}</h2>
  </div>
);

const AuthFormFields = ({ fields, form }: { fields: FormField[]; form: UseFormReturn<any> }) => (
  <div className="space-y-4">
    {fields.map((field) => (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="text-foreground text-sm">
          {field.label}
        </Label>
        <Input
          id={field.id}
          type={field.type}
          {...form.register(field.id)}
          autoComplete={field.autoComplete}
          className="placeholder:text-muted-foreground h-10 px-3"
          placeholder={field.placeholder}
          aria-invalid={!!form.formState.errors[field.id]}
        />
        {form.formState.errors[field.id] && (
          <p className="text-xs text-destructive mt-1">
            {form.formState.errors[field.id]?.message?.toString()}
          </p>
        )}
      </div>
    ))}
  </div>
);

const AuthFormDivider = ({ text }: { text: ReactNode }) => (
  <div className="relative flex items-center justify-center my-4">
    <span className="absolute inset-x-0 h-px bg-border" />
    <span className="relative bg-card px-3 text-xs md:text-sm text-muted-foreground">{text}</span>
  </div>
);

const AuthFormFooter = ({ children }: { children: ReactNode }) => (
  <div className="my-4">
    <p className="text-xs md:text-sm text-muted-foreground text-center">{children}</p>
  </div>
);

const AuthFormSubmit = ({ isPending, children }: { isPending?: boolean; children: ReactNode }) => (
  <Button disabled={isPending} type="submit" className="w-full uppercase font-medium text-sm h-10">
    {isPending && <Loader2 className="h-4 w-4 shrink-0 animate-spin mr-2" aria-hidden="true" />}
    {children}
  </Button>
);

const AuthFormStatus = ({ error, success }: { error?: string | null; success?: string | null }) => (
  <>
    {success && (
      <div className="flex items-center gap-2 rounded-md bg-green-500 p-2 text-white text-sm">
        <CircleCheckIcon className="h-4 w-4 flex-shrink-0" />
        <span>Success! {success}</span>
      </div>
    )}
    {error && (
      <div className="flex items-center gap-2 rounded-md bg-destructive p-2 text-destructive-foreground text-sm">
        <CircleX className="h-4 w-4 flex-shrink-0" />
        <span>Error! {error}</span>
      </div>
    )}
  </>
);

const AuthFormContainer = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <form
    className="border border-border shadow-md p-5 md:p-8 rounded-lg bg-card w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]"
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

const AuthFormWrapper = ({ children, form }: { children: ReactNode; form: UseFormReturn<any> }) => (
  <div className="w-full max-w-md mx-auto">
    <FormProvider {...form}>{children}</FormProvider>
  </div>
);

export const AuthForm = {
  Wrapper: AuthFormWrapper,
  Container: AuthFormContainer,
  Header: AuthFormHeader,
  Fields: AuthFormFields,
  Divider: AuthFormDivider,
  Footer: AuthFormFooter,
  Submit: AuthFormSubmit,
  Status: AuthFormStatus,
};
