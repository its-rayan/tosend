import authConfig from '@/auth.config';
import connectToMongoClient from '@/database/connect-mongo-client';
import {
  AUTH_FROM_EMAIL,
  AUTH_PAGES,
  AUTH_SMTP_FROM_EMAIL,
} from '@/util/constants/auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import Resend from 'next-auth/providers/resend';
import sendEmail from './lib/emails';

const mongoClient = connectToMongoClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClient),
  session: { strategy: 'jwt' },
  ...authConfig,
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
          subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link from Nodemailer`,
          html: `<p>Sign in to ${url} by clicking <a href="${url}">here</a>.</p>`,
        });
      },
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: AUTH_FROM_EMAIL,
      sendVerificationRequest: ({ identifier: email, url, provider }) => {
        return sendEmail({
          email,
          from: provider.from,
          subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link from Resend`,
          html: `<p>Sign in to ${url} by clicking <a href="${url}">here</a>.</p>`,
        });
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: AUTH_PAGES.SIGN_IN,
    error: AUTH_PAGES.SIGN_IN,
  },
});
