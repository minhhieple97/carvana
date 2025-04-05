import { CustomerStatus } from '@prisma/client';
import { z } from 'zod';

export const SubmitDetailsSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).trim(),
  lastName: z.string().min(1, { message: 'Last name is required' }).trim(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  mobile: z
    .string()
    .min(1, { message: 'Mobile number is required' })
    .regex(/^[0-9+\s()-]{10,15}$/, {
      message: 'Please enter a valid mobile number',
    })
    .trim(),
  terms: z
    .boolean({
      required_error: 'You must agree to the terms and conditions',
      invalid_type_error: 'Terms must be a boolean value',
    })
    .refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

export type SubmitDetailsSchemaType = z.infer<typeof SubmitDetailsSchema>;

export const CreateCustomerSchema = SubmitDetailsSchema.extend({
  date: z.date(),
  slug: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

export const EditCustomerSchema = z.object({
  status: z.nativeEnum(CustomerStatus),
});

export type EditCustomerType = z.infer<typeof EditCustomerSchema>;

export const UpdateCustomerSchema = EditCustomerSchema.extend({
  id: z.number(),
});
