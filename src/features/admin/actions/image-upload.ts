'use server';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { v4 as uuidv4 } from 'uuid';

import { MAX_IMAGE_SIZE } from '@/config';
import { env } from '@/env';
import { s3, uploadToS3 } from '@/lib/s3';
import { adminAction, ActionError } from '@/lib/safe-action';
import {
  SingleImageUploadSchema,
  InitialiseMultipartUploadSchema,
  FinaliseMultipartUploadSchema,
} from '@/schemas';

import type { UserSession } from '@/features/auth';
import type {
  CreateMultipartUploadCommandInput,
  CompleteMultipartUploadCommandInput,
} from '@aws-sdk/client-s3';

const singleUpload = async ({
  parsedInput: { file },
  ctx: _ctx,
}: {
  parsedInput: { file: File };
  ctx: { user: UserSession };
}) => {
  try {
    if (file.size > MAX_IMAGE_SIZE) {
      throw new ActionError('File size exceeds maximum limit');
    }

    const { default: mimetype } = await import('mime-types');
    const mime = mimetype.lookup(file.name)?.toString();

    if (!mime?.match(/image\/(jpeg|jpg|png|webp)/)) {
      throw new ActionError('Invalid file type');
    }

    const uuid = uuidv4();
    const decodedFileName = decodeURIComponent(decodeURIComponent(file.name));
    const key = `uploads/${uuid}/${decodedFileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadToS3({
      bucketName: env.AWS_S3_BUCKET_NAME,
      file: buffer,
      path: key,
      mimetype: mime,
    });

    const url = `${env.NEXT_PUBLIC_S3_URL}/${key}`;
    return { url };
  } catch (error) {
    console.error('Action Error [singleUpload]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) throw error;
    throw new ActionError('An unexpected error occurred during upload.');
  }
};

const initMultipartUpload = async ({
  parsedInput: { name, uuid },
  ctx: _ctx,
}: {
  parsedInput: { name: string; uuid: string };
  ctx: { user: UserSession };
}) => {
  try {
    const key = `uploads/${uuid}/${name}`;
    const { default: mimetype } = await import('mime-types');
    const mime = mimetype.lookup(name);

    const multipartParams: CreateMultipartUploadCommandInput = {
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key.replace(/\s+/g, '-'),
      ...(mime && { ContentType: mime }),
    };

    const { CreateMultipartUploadCommand } = await import('@aws-sdk/client-s3');
    const command = new CreateMultipartUploadCommand(multipartParams);
    const multipartUpload = await s3.send(command);

    return {
      fileId: multipartUpload.UploadId,
      fileKey: multipartUpload.Key,
    };
  } catch (error) {
    console.error('Action Error [initMultipartUpload]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) throw error;
    throw new ActionError('An unexpected error occurred during multipart upload initialization.');
  }
};

const finalizeMultipartUpload = async ({
  parsedInput: { fileId, fileKey, parts },
  ctx: _ctx,
}: {
  parsedInput: {
    fileId: string;
    fileKey: string;
    parts: Array<{ ETag: string; PartNumber: number }>;
  };
  ctx: { user: UserSession };
}) => {
  try {
    const { default: mimetype } = await import('mime-types');
    const { default: orderBy } = await import('lodash.orderby');
    const mime = mimetype.lookup(fileKey);

    const multipartParams: CompleteMultipartUploadCommandInput = {
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
      MultipartUpload: {
        Parts: orderBy(parts, ['PartNumber'], ['asc']),
      },
      ...(mime && { ContentType: mime }),
    };

    const { CompleteMultipartUploadCommand } = await import('@aws-sdk/client-s3');
    const command = new CompleteMultipartUploadCommand(multipartParams);
    const payload = await s3.send(command);

    return {
      url: payload.Location,
      key: payload.Key,
    };
  } catch (error) {
    console.error('Action Error [finalizeMultipartUpload]:', error);
    if (isRedirectError(error)) throw error;
    if (error instanceof ActionError) throw error;
    throw new ActionError('An unexpected error occurred during multipart upload finalization.');
  }
};

export const singleUploadAction = adminAction.schema(SingleImageUploadSchema).action(singleUpload);

export const initMultipartUploadAction = adminAction
  .schema(InitialiseMultipartUploadSchema)
  .action(initMultipartUpload);

export const finalizeMultipartUploadAction = adminAction
  .schema(FinaliseMultipartUploadSchema)
  .action(finalizeMultipartUpload);
