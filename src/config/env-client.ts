import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_STORAGE_URL: z.string().url(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
});

type ClientEnv = z.infer<typeof clientEnvSchema>;

const clientEnvConfig: Record<keyof ClientEnv, unknown> = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
};

export const ENV_CLIENT: Readonly<ClientEnv> = clientEnvSchema.parse(clientEnvConfig);
