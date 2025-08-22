import authConfig from '@/auth.config';
import connectToMongoClient from '@/database/connect-mongo-client';
import { AUTH_PAGES } from '@/util/constants/auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';

const mongoClient = connectToMongoClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClient),
  session: { strategy: 'jwt' },
  ...authConfig,
  pages: {
    signIn: AUTH_PAGES.SIGN_IN,
    newUser: AUTH_PAGES.SIGN_UP,
  },
});
