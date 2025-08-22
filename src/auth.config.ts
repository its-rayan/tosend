import { AUTH_FROM_EMAIL } from '@/util/constants/auth';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

export default {
  providers: [
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
