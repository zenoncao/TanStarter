import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getDb } from '../db';
import { user } from '../db/schema';

const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  const env = process.env as unknown as Env;
  // In local development with Vite (Node), Cloudflare bindings might not be available directly
  // unless using a proxy or specific setup.

  if (!env || !env.DB) {
    console.warn(
      'Database binding not found. Are you running in Cloudflare context?',
    );
    return [];
  }

  const db = getDb(env);
  return await db.select().from(user);
});

export const Route = createFileRoute('/users')({
  loader: () => getUsers(),
  component: Users,
});

function Users() {
  const users = Route.useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users from D1</h1>
      {users.length === 0 ? (
        <p>No users found or DB not connected.</p>
      ) : (
        <ul className="list-disc pl-5">
          {users.map((u) => (
            <li key={u.id}>
              {u.name} ({u.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
