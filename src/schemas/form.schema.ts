import { z } from 'zod';

import { MultiStepFormEnum } from '@/config/types';

export const MultiStepFormSchema = z.object({
  step: z.nativeEnum(MultiStepFormEnum),
  slug: z.string(),
});

export const SelectDateSchema = z.object({
  handoverDate: z
    .string()
    .min(1, { message: 'Handover Date is required' })
    .regex(/^\d{2} [A-Za-z]{3} \d{4}$/, {
      message: 'Date must be in format: DD MMM YYYY (e.g., 05 Apr 2025)',
    }),
  handoverTime: z
    .string()
    .min(1, { message: 'Handover Time is required' })
    .regex(/^\d{2}:\d{2} [ap]m$/, {
      message: 'Time must be in format: HH:MM am/pm (e.g., 09:00 am)',
    }),
});

export type SelectDateType = z.infer<typeof SelectDateSchema>;
