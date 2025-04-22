import { PutObjectCommand, type PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Credentials } from 'aws-sdk/lib/core';

import { env } from '@/env';

const credentials = new Credentials({
  accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
});

export const s3 = new S3Client({
  credentials,
});

interface UploadToS3Args {
  bucketName: string;
  path: string;
  file: Buffer;
  mimetype: string;
}

export async function uploadToS3({ bucketName, file, path, mimetype }: UploadToS3Args) {
  const params = {
    Bucket: bucketName,
    Key: path,
    Body: file,
    ContentType: mimetype,
    CacheControl: 'no-store',
  } satisfies PutObjectCommandInput;

  try {
    const command = new PutObjectCommand(params);
    return s3.send(command);
  } catch (error: unknown) {
    throw new Error(`Failed to upload file: ${path}. Error: ${error}`);
  }
}
