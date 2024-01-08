import * as z from 'zod';

export const envSchema = z.object({
  VITE_AUTH0_DOMAIN: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
});

const env = envSchema.parse(import.meta.env);

export default env;
