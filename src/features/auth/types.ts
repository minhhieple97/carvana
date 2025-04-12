import type { SignInSchema, SignUpSchema, SessionSchema } from '@/schemas';
import type { Role } from '@prisma/client';
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
