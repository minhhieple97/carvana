import { z } from 'zod';

import { MultiStepFormEnum } from '@/config/types';

export const MultiStepFormSchema = z.object({
  step: z.nativeEnum(MultiStepFormEnum),
  slug: z.string(),
});

export const SelectDateSchema = z.object({
  handoverDate: z.string({ message: 'Handover Date is required' }),
  handoverTime: z.string({ message: 'Handover Time is required' }),
});

export type SelectDateType = z.infer<typeof SelectDateSchema>;
