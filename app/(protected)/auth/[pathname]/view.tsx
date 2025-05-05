'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthCard pathname={pathname} />
    </main>
  );
}

// Just an example, SettingsCards already includes this
// useAuthenticate({ enabled: pathname === "settings" })
