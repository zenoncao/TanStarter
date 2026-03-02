import Stripe from 'stripe';

export const getStripe = (env: Env) => {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is missing');
  }
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia',
    httpClient: Stripe.createFetchHttpClient(),
  });
};
