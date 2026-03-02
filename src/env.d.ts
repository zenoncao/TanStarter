/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
}
