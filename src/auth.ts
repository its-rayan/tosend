import connectToMongoClient from '@/database/connect-mongo-client';
import { AUTH_FROM_EMAIL, AUTH_PAGES } from '@/util/constants/auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

const mongoClient = connectToMongoClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
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
  adapter: MongoDBAdapter(mongoClient),
  pages: {
    signIn: AUTH_PAGES.SIGN_IN,
    newUser: AUTH_PAGES.SIGN_UP,
  },
});
