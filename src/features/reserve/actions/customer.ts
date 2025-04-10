'use server';

import { nanoid } from 'nanoid';

import { CreateCustomerSchema, DeleteCustomerSchema, UpdateCustomerSchema } from '@/app/schemas';
import { action, ActionError } from '@/lib/safe-action';

import {
  buildSubmissionKey,
  checkExistingReservation,
  checkRecentSubmission,
  createNewCustomer,
  saveSubmissionToRedis,
  deleteCustomer as deleteCustomerService,
  updateCustomer as updateCustomerService,
  cleanupRedisSubmission,
  findCustomerById,
} from '../services/customer';

export const createCustomerAction = action
  .schema(CreateCustomerSchema)
  .action(async ({ parsedInput }) => {
    const { email, mobile, slug } = parsedInput;
    const submissionKey = buildSubmissionKey(email, mobile, slug);

    try {
      const requestId = parsedInput.requestId || nanoid();

      const recentCheck = await checkRecentSubmission(submissionKey, requestId);

      if (recentCheck.isRecent && !recentCheck.isDuplicate) {
        throw new ActionError(recentCheck.message || 'Too many submissions');
      }

      const existingReservation = await checkExistingReservation(email, slug, parsedInput.date);

      if (existingReservation.exists) {
        throw new ActionError(existingReservation.message);
      }
      await saveSubmissionToRedis(submissionKey, requestId);
      return createNewCustomer({ ...parsedInput, requestId });
    } catch (error) {
      await cleanupRedisSubmission(submissionKey);
      throw error;
    }
  });

export const updateCustomerAction = action
  .schema(UpdateCustomerSchema)
  .action(async ({ parsedInput }) => {
    const { id, status } = parsedInput;

    const customer = await findCustomerById(id);

    if (!customer) {
      throw new ActionError('Customer not found');
    }

    return updateCustomerService(id, status);
  });

export const deleteCustomerAction = action
  .schema(DeleteCustomerSchema)
  .action(async ({ parsedInput }) => deleteCustomerService(parsedInput.id));
