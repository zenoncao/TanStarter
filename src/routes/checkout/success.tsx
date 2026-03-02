import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
});

function CheckoutSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="bg-green-50 text-green-700 p-8 rounded-lg shadow-sm text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">
          Thank you for your purchase. You will receive an email confirmation
          shortly.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
