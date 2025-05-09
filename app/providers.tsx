'use client';

import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack';
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack';
import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  queryClient.getQueryCache().config.onError = (error, query) => {
    console.error(error, query);

    if (error.message) toast.error(error.message);
  };

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthQueryProvider>
        <AuthUIProviderTanstack
          authClient={authClient}
          navigate={router.push}
          replace={router.replace}
          onSessionChange={() => {
            router.refresh();
          }}
          signUpFields={[""]}
          magicLink
          nameRequired={false}
          Link={Link}
          multiSession
          deleteUser
          username
        >
          {children}
        </AuthUIProviderTanstack>
      </AuthQueryProvider>
    </QueryClientProvider>
  );
}
