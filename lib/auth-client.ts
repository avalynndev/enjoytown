import { createAuthClient } from 'better-auth/react';
import {
  usernameClient,
  multiSessionClient,
  magicLinkClient,
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [usernameClient(), multiSessionClient(), magicLinkClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
