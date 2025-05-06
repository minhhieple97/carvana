import { Role } from '@prisma/client';
import { z } from 'zod';

const emailField = z.string().email('Invalid email address');
const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const SignInSchema = z.object({
  email: emailField,
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SignUpSchema = z
  .object({
    email: emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SessionSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
  email: z.string().email('Invalid email address'),
});
