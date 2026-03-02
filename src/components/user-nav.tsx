import { Link, useRouter } from '@tanstack/react-router';
import { authClient } from '../lib/auth-client';

export function UserNav() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="text-sm">Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex gap-4 items-center text-sm">
        <span>{session.user.name}</span>
        <button
          type="button"
          onClick={async () => {
            await authClient.signOut();
            router.invalidate();
          }}
          className="text-red-600 hover:text-red-800"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 text-sm font-medium">
      <Link to="/auth/signin" className="hover:text-blue-600">
        Sign In
      </Link>
      <Link to="/auth/signup" className="hover:text-green-600">
        Sign Up
      </Link>
    </div>
  );
}
