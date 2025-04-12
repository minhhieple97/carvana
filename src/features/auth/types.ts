import type { getUserById } from './db';
import type { getUserFromSession } from './services/session';
import type { SignInSchema, SignUpSchema, SessionSchema } from '@/schemas';
import type { Role } from '@prisma/client';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

export type UserSession = z.infer<typeof SessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: 'strict' | 'lax';
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export type SignInInput = z.infer<typeof SignInSchema>;
export type SignUpInput = Omit<z.infer<typeof SignUpSchema>, 'confirmPassword'>;

export type CreateUserData = Omit<SignUpInput, 'confirmPassword'> & {
  role?: Role;
};

export type SignInData = SignInInput;

export type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
};

export interface AuthFormProps {
  title: string;
  fields: FormField[];
  submitButtonText: string;
  footerText?: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  error: string | null;
  success: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

export type FullUser = Exclude<Awaited<ReturnType<typeof getUserById>>, undefined | null>;

export type User = Exclude<Awaited<ReturnType<typeof getUserFromSession>>, undefined | null>;
