import { NextResponse } from 'next/server';

import { env } from '@/env';
import { checkAdmin } from '@/lib/auth';
import { s3 } from '@/lib/s3';
import { FinaliseMultipartUploadSchema } from '@/schemas';

import type { CompleteMultipartUploadCommandInput } from '@aws-sdk/client-s3';
import type { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await checkAdmin();
    const data = await req.json();
    const validated = FinaliseMultipartUploadSchema.safeParse(data);
    if (!validated.success) return NextResponse.error();
    const { fileId, fileKey, parts } = validated.data;
    const { default: mimetype } = await import('mime-types');
    const mime = mimetype.lookup(fileKey);

    const { default: orderBy } = await import('lodash.orderby');

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

    return NextResponse.json(
      {
        url: payload.Location,
        key: payload.Key,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in finalising multipart upload: ${error}`);
    return NextResponse.error();
  }
};
