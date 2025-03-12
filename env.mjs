import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  shared: {
    DOWNLOAD_API_URL: z.string().url(),
    CONSUMET_API_URL: z.string().url(),
    GOOD_PROXY_URL: z.string().url(),
    TMDB_API_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
