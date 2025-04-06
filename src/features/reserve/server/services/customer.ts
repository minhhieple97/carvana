import { nanoid } from 'nanoid';

import { CreateCustomerSchema, UpdateCustomerSchema } from '@/app/schemas/customer.schema';
import { redis } from '@/lib/redis-store';

import {
  createCustomer,
  findCustomerReservation,
  deleteCustomer as dbDeleteCustomer,
  findCustomerById,
  updateCustomerStatus,
} from '../db/customer';

import type { CreateCustomerType } from '@/app/schemas/customer.schema';

const REDIS_SUBMISSION_PREFIX = 'customer_submission:';
const THROTTLE_TIME = 30000;
const THROTTLE_TIME_EXPIRY = 3600;
export const validateCustomerData = (props: CreateCustomerType) => {
  const { data, success } = CreateCustomerSchema.safeParse(props);

  if (!success) {
    return { success: false, message: 'Invalid data', data: null };
  }

  if (!data.terms) {
    return { success: false, message: 'You must accept the terms', data: null };
  }

  return { success: true, data };
};

export const checkRecentSubmission = async (submissionKey: string, requestId: string) => {
  const now = Date.now();

  try {
    const recentSubmission = await redis.get<{ timestamp: number; requestId: string }>(
      submissionKey
    );

    if (recentSubmission && now - recentSubmission.timestamp < THROTTLE_TIME) {
      if (recentSubmission.requestId === requestId) {
        return { isRecent: true, isDuplicate: true, submissionKey };
      }
      return {
        isRecent: true,
        isDuplicate: false,
        submissionKey,
        message: 'You recently submitted this reservation. Please wait before trying again.',
      };
    }

    return { isRecent: false, isDuplicate: false, submissionKey };
  } catch (error) {
    console.error('Redis error while checking submission:', error);
    return { isRecent: false, isDuplicate: false, submissionKey };
  }
};

export const saveSubmissionToRedis = async (submissionKey: string, requestId: string) => {
  try {
    await redis.set(
      submissionKey,
      { timestamp: Date.now(), requestId },
      { ex: THROTTLE_TIME_EXPIRY }
    );
    return true;
  } catch (error) {
    console.error('Redis error while saving submission:', error);
    return false;
  }
};

export const removeSubmissionFromRedis = async (submissionKey: string) => {
  try {
    await redis.del(submissionKey);
    return true;
  } catch (error) {
    console.error('Redis error while removing submission:', error);
    return false;
  }
};

export const checkExistingReservation = async (email: string, slug: string, date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingReservation = await findCustomerReservation(email, slug, startOfDay, endOfDay);

  if (existingReservation) {
    return {
      exists: true,
      message:
        'You have already reserved this car today. You can reserve different cars but not the same one multiple times in a day.',
    };
  }

  return { exists: false };
};

export const createNewCustomer = async (data: CreateCustomerType) => {
  const { date, terms, slug, ...customerData } = data;
  const requestId = data.requestId || nanoid();

  await createCustomer({
    ...customerData,
    bookingDate: date,
    termsAccepted: terms,
    classified: { connect: { slug } },
    requestId,
  });

  return { success: true, message: 'Reservation Successful!' };
};

export const deleteCustomer = async (id: number) => {
  try {
    await dbDeleteCustomer(id);
    return { success: true, message: 'Customer deleted' };
  } catch {
    return { success: false, message: 'Something went wrong deleting customer' };
  }
};

export const updateCustomer = async (id: number, status: string) => {
  const validProps = UpdateCustomerSchema.safeParse({ id, status });

  if (!validProps.success) {
    return { success: false, message: 'Invalid data' };
  }

  const customer = await findCustomerById(validProps.data.id);

  if (!customer) {
    return { success: false, message: 'Customer not found' };
  }

  await updateCustomerStatus(customer.id, validProps.data.status, customer.status);

  return { success: true, message: 'Customer updated' };
};

export const cleanupRedisSubmission = async (submissionKey: string) => {
  try {
    await redis.del(submissionKey);
    return true;
  } catch (error) {
    console.error('Redis error while removing submission:', error);
    return false;
  }
};

export const buildSubmissionKey = (email: string, mobile: string, slug: string) =>
  `${REDIS_SUBMISSION_PREFIX}${email}_${mobile}_${slug}`;
