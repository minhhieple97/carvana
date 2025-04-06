'use server';

import { nanoid } from 'nanoid';

import {
  validateCustomerData,
  checkRecentSubmission,
  checkExistingReservation,
  createNewCustomer,
  saveSubmissionToRedis,
  deleteCustomer as deleteCustomerService,
  updateCustomer as updateCustomerService,
  cleanupRedisSubmission,
  buildSubmissionKey,
} from '../server/services/customer';

import type { CreateCustomerType } from '@/app/schemas/customer.schema';
import type { CustomerStatus } from '@prisma/client';

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { success, message, data } = validateCustomerData(props);

    if (!success || !data) {
      return { success, message };
    }

    const { email, mobile, slug } = data;
    const requestId = props.requestId || nanoid();
    const submissionKey = buildSubmissionKey(email, mobile, slug);
    const {
      isRecent,
      isDuplicate,
      message: throttleMessage,
    } = await checkRecentSubmission(submissionKey, requestId);

    if (isRecent) {
      if (isDuplicate) {
        return { success: true, message: 'Reservation Successful!' };
      }
      return { success: false, message: throttleMessage };
    }

    const { exists, message: existsMessage } = await checkExistingReservation(
      email,
      slug,
      data.date
    );

    if (exists) {
      return { success: false, message: existsMessage };
    }

    await saveSubmissionToRedis(submissionKey, requestId);

    const result = await createNewCustomer({
      ...data,
      requestId,
    });

    return result;
  } catch (error) {
    console.error(error);
    if (props.email && props.mobile && props.slug) {
      const submissionKey = buildSubmissionKey(props.email, props.mobile, props.slug);
      await cleanupRedisSubmission(submissionKey);
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
};

export const deleteCustomerAction = async (id: number) => deleteCustomerService(id);

export const updateCustomerAction = async (props: { id: number; status: CustomerStatus }) => {
  try {
    return updateCustomerService(props.id, props.status);
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
};
