import { NextResponse } from 'next/server';

import { env } from '@/env';
import { checkAdmin } from '@/lib/auth';
import { s3 } from '@/lib/s3';
import { GetMultipartUploadSchema } from '@/schemas';

import type { UploadPartCommandInput } from '@aws-sdk/client-s3';
import type { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await checkAdmin();
    const data = await req.json();
    const validated = GetMultipartUploadSchema.safeParse(data);
    if (!validated.success) return NextResponse.error();
    const { fileId, fileKey, parts } = validated.data;

    const multipartParams: Omit<UploadPartCommandInput, 'PartNumber'> = {
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
    };

    const promises: Promise<string>[] = [];

    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const { UploadPartCommand } = await import('@aws-sdk/client-s3');

    for (let index = 0; index < parts; index += 1) {
      const command = new UploadPartCommand({
        ...multipartParams,
        PartNumber: index + 1,
      });

      promises.push(getSignedUrl(s3, command));
    }

    const signedUrls = await Promise.all(promises);

    const partSignedUrlList = signedUrls.map((signedUrl, index) => ({
      signedUrl,
      PartNumber: index + 1,
    }));
    return NextResponse.json(
      {
        parts: partSignedUrlList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in getting multipart upload: ${error}`);
    return NextResponse.error();
  }
};
