import { AuthCard, authViewPaths } from '@daveyplate/better-auth-ui';

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
  const { pathname } = await params;
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthCard pathname={pathname} />
    </main>
  );
}

