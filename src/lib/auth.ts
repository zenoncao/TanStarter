import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db';
import { account, session, user, verification } from '../db/schema';

export const auth = (env: Env) => {
  return betterAuth({
    database: drizzleAdapter(getDb(env), {
      provider: 'sqlite',
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    // You can add social providers here
  });
};
