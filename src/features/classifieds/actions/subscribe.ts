'use server';

import { CustomerStatus } from '@prisma/client';

import { action, ActionError } from '@/lib/safe-action';
import { SubscribeSchema } from '@/schemas';

import { createSubscriber, getSubscriber } from '../services';

export const subscribeAction = action.schema(SubscribeSchema).action(async ({ parsedInput }) => {
  const { firstName, lastName, email } = parsedInput;

  const subscriber = await getSubscriber(email);
  if (subscriber) {
    throw new ActionError('You are already subscribed!');
  }

  await createSubscriber({
    firstName,
    lastName,
    email,
    status: CustomerStatus.SUBSCRIBER,
  });

  return { message: 'Subscribed successfully!' };
});
