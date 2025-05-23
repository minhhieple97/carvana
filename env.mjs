import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_S3_ACCESS_KEY_ID: z.string(),
    AWS_S3_SECRET_ACCESS_KEY: z.string(),
    OAUTH_REDIRECT_URL_BASE: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    OPENAI_API_KEY: z.string(),
    OPENAI_MODEL: z.string(),
    OPENAI_BASE_URL: z.string(),
    AWS_S3_REGION: z.string(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGIX_URL: z.string().url(),
    NEXT_PUBLIC_TINYMCE_API_KEY: z.string(),
    NEXT_PUBLIC_S3_URL: z.string().url(),
    NEXT_PUBLIC_IMGIX_HOSTNAME: z.string(),
    NEXT_PUBLIC_S3_HOSTNAME: z.string(),
    NEXT_PUBLIC_VL_IMGIX_HOSTNAME: z.string(),
    NEXT_PUBLIC_CARVANA_S3_HOSTNAME: z.string(),
  },

  runtimeEnv: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    OAUTH_REDIRECT_URL_BASE: process.env.OAUTH_REDIRECT_URL_BASE,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
    NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    NEXT_PUBLIC_IMGIX_HOSTNAME: process.env.NEXT_PUBLIC_IMGIX_HOSTNAME,
    NEXT_PUBLIC_S3_HOSTNAME: process.env.NEXT_PUBLIC_S3_HOSTNAME,
    NEXT_PUBLIC_VL_IMGIX_HOSTNAME: process.env.NEXT_PUBLIC_VL_IMGIX_HOSTNAME,
    NEXT_PUBLIC_CARVANA_S3_HOSTNAME: process.env.NEXT_PUBLIC_CARVANA_S3_HOSTNAME,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
  },
});
