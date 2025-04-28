'use server';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { adminAction, ActionError } from '@/lib/safe-action';
import {
  CreateClassifiedSchema,
  updateClassifiedSchema,
  DeleteClassifiedSchema,
} from '@/schemas/classified.schema';

import {
  createClassified as createClassifiedService,
  updateClassified as updateClassifiedService,
  deleteClassified as deleteClassifiedService,
} from '../services/classified.service';

import type { UserSession } from '@/features/auth';
import type {
  CreateClassifiedType,
  UpdateClassifiedType,
  DeleteClassifiedType,
} from '@/schemas/classified.schema';

const createClassified = async ({
  parsedInput: data,
  ctx: _ctx,
}: {
  parsedInput: CreateClassifiedType;
  ctx: { user: UserSession | undefined };
}) => {
  try {
    const classifiedId = await createClassifiedService(data);

    return { classifiedId };
  } catch (error) {
    console.error('Action Error [createClassified]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError('An unexpected error occurred during creation.');
  }
};

export const createClassifiedAction = adminAction
  .schema(CreateClassifiedSchema)
  .action(createClassified);

const updateClassified = async ({
  parsedInput: data,
  ctx: _ctx,
}: {
  parsedInput: UpdateClassifiedType;
  ctx: { user: UserSession | undefined };
}) => {
  try {
    await updateClassifiedService(data);
  } catch (error) {
    console.error('Action Error [updateClassified]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError('An unexpected error occurred during update.');
  }
};

export const updateClassifiedAction = adminAction
  .schema(updateClassifiedSchema)
  .action(updateClassified);

const deleteClassified = async ({
  parsedInput: { id },
  ctx: _ctx,
}: {
  parsedInput: DeleteClassifiedType;
  ctx: { user?: UserSession | undefined };
}) => {
  try {
    await deleteClassifiedService(id);
  } catch (error) {
    console.error('Action Error [deleteClassified]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError('An unexpected error occurred during deletion.');
  }
};

export const deleteClassifiedAction = adminAction
  .schema(DeleteClassifiedSchema)
  .action(deleteClassified);
