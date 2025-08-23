import { AUTH_FROM_EMAIL, AUTH_SMTP_FROM_EMAIL } from '@/util/constants/auth';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import Resend from 'next-auth/providers/resend';
import sendEmail from './lib/emails';

export default {
  providers: [
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: AUTH_SMTP_FROM_EMAIL,
      sendVerificationRequest: ({ identifier: email, url, provider }) => {
        return sendEmail({
          email,
          from: provider.from,
          subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`,
          html: `<p>Sign in to ${url} by clicking <a href="${url}">here</a>.</p>`,
        });
      },
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: AUTH_FROM_EMAIL,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
