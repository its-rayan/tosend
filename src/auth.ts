import connectToMongoClient from '@/database/connect-mongo-client';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';

const mongoClient = connectToMongoClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  adapter: MongoDBAdapter(mongoClient),
});
