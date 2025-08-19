import connectToMongoClient from '@/database/connect-mongo-client';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';

const mongoClient = connectToMongoClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'no-reply@resend.tosend.co',
      name: 'Email',
    }),
  ],
  adapter: MongoDBAdapter(mongoClient),
});
