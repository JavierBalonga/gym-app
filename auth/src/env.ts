import dotenv from "dotenv";
import * as z from "zod";

dotenv.config();

export const envSchema = z.object({
  MODE: z.enum(["development", "production"]),
  AUTH0_DOMAIN: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
