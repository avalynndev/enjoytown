import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username, multiSession, magicLink } from 'better-auth/plugins';
import { db } from '@/db/drizzle';
import { schema } from '@/schema';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import { EmailTemplate } from '@daveyplate/better-auth-ui/server';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const fromEmail = 'AVALYNNDEV <noreply@auth.newtech.dev>'; // add email

export const auth = betterAuth({
  appName: 'Enjoytown',
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await resend.emails.send({
        from: fromEmail,
        to: user.email,
        subject: 'Reset your password',
        react: EmailTemplate({
          heading: 'Reset Password',
          content: 'Click the button below to reset your password.',
          action: 'Reset Password',
          url,
        }),
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
        await resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject: 'Verify your email change',
          react: EmailTemplate({
            heading: 'Verify Email Change',
            content: 'Click the button below to verify your email change.',
            action: 'Verify Email Change',
            url,
          }),
        });
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    nextCookies(),
    username(),
    multiSession(),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'Magic Link',
          react: EmailTemplate({
            heading: 'Magic Link',
            content: 'Click the button below to securely log in.',
            action: 'Log In',
            url: url,
          }),
        });
      },
    }),
  ],
});
export const { getSession } = auth.api;

export type SessionData = (typeof auth)['$Infer']['Session'];
