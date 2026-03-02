import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const env = process.env as unknown as Env;

        if (!env || !env.DB) {
          return new Response('Database binding not found', { status: 500 });
        }

        const betterAuth = auth(env);
        return betterAuth.handler(request);
      },
      POST: async ({ request }) => {
        const env = process.env as unknown as Env;

        if (!env || !env.DB) {
          return new Response('Database binding not found', { status: 500 });
        }

        const betterAuth = auth(env);
        return betterAuth.handler(request);
      },
    },
  },
});
