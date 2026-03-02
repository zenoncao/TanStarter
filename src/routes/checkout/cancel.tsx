import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
});

function CheckoutCancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="bg-red-50 text-red-700 p-8 rounded-lg shadow-sm text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="mb-6">The payment was cancelled. No charges were made.</p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/checkout"
            className="inline-block px-6 py-3 bg-white border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
