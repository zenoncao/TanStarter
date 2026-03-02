import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { UserNav } from '@/components/user-nav';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="p-4 border-b flex justify-between items-center text-sm font-medium">
          <div className="flex gap-4">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/users" className="[&.active]:font-bold">
              Users (D1)
            </Link>
            <Link to="/storage" className="[&.active]:font-bold">
              Storage (R2)
            </Link>
            <Link to="/checkout" className="[&.active]:font-bold">
              Checkout (Stripe)
            </Link>
            <Link to="/email/send" className="[&.active]:font-bold">
              Email (Resend)
            </Link>
          </div>
          <UserNav />
        </nav>
        <main>{children}</main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
