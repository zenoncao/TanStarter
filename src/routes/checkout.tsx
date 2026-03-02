import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getStripe } from '../lib/stripe';

// Server Function to create checkout session
const createCheckoutSession = createServerFn({ method: 'POST' })
  .validator((data: { priceId: string }) => data)
  .handler(async ({ data }) => {
    const env = process.env as unknown as Env;

    if (!env || !env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe configuration missing');
    }

    const stripe = getStripe(env);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Use the priceId from the client
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.BETTER_AUTH_URL}/checkout/success`,
      cancel_url: `${env.BETTER_AUTH_URL}/checkout/cancel`,
    });

    return { url: session.url };
  });

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const { url } = await createCheckoutSession({
        data: { priceId: 'price_fake' },
      });
      if (url) {
        window.location.href = url;
      } else {
        setError('Failed to create checkout session');
      }
      // biome-ignore lint/suspicious/noExplicitAny: Error handling
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Premium Plan
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            Pro Subscription
          </h1>
          <p className="mt-2 text-gray-500">
            Unlock all features with our Pro plan. Get access to advanced
            analytics, priority support, and more.
          </p>

          <div className="mt-6 flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">$20</span>
            <span className="ml-1 text-xl font-medium text-gray-500">
              /month
            </span>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
