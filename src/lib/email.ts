import { Resend } from 'resend';

export const getResend = (env: Env) => {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing');
  }
  return new Resend(env.RESEND_API_KEY);
};
