import { createFileRoute } from '@tanstack/react-router';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

export const Route = createFileRoute('/api/stripe/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = process.env as unknown as Env;

        if (!env || !env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
          console.error('Stripe configuration missing');
          return new Response('Configuration Error', { status: 500 });
        }

        const signature = request.headers.get('stripe-signature');
        if (!signature) {
          return new Response('No signature', { status: 400 });
        }

        const body = await request.text();
        const stripe = getStripe(env);

        let stripeEvent: Stripe.Event;

        try {
          stripeEvent = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET,
          );
          // biome-ignore lint/suspicious/noExplicitAny: Error handling
        } catch (err: any) {
          console.error(
            `Webhook signature verification failed: ${err.message}`,
          );
          return new Response(`Webhook Error: ${err.message}`, { status: 400 });
        }

        // Handle the event
        try {
          switch (stripeEvent.type) {
            case 'checkout.session.completed': {
              const session = stripeEvent.data.object;
              // TODO: Fulfill the order
              console.log('Payment successful for session:', session.id);
              // e.g. update user subscription status in DB
              break;
            }
            default:
              console.log(`Unhandled event type ${stripeEvent.type}`);
          }
        } catch (error) {
          console.error('Error processing webhook:', error);
          return new Response('Error processing webhook', { status: 500 });
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
