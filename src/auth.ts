import authConfig from '@/auth.config';
import connectToMongoClient from '@/database/connect-mongo-client';
import User from '@/database/models/user';
import {
  AUTH_EMAIL_VERIFICATION_SUBJECT,
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
  pages: {
    signIn: AUTH_PAGES.SIGN_IN,
    error: AUTH_PAGES.SIGN_IN,
  },
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
          subject: AUTH_EMAIL_VERIFICATION_SUBJECT,
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
          subject: AUTH_EMAIL_VERIFICATION_SUBJECT,
          html: `<p>Sign in to ${url} by clicking <a href="${url}">here</a>.</p>`,
        });
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Custom signIn logic
      console.log('SignIn callback:', {
        user,
        account,
        profile,
        email,
        credentials,
      });

      // check if user has signed in with google
      if (account?.type === 'email') {
        const updatedUserObj = {
          ...user,
          name: user?.email?.split('@')[0],
          image: 'avatar_url_for_email',
        };

        console.log('Updated user object:', updatedUserObj);

        const userExists = await User.findOne({ email: user?.email });
        if (!userExists) {
          await User.create(updatedUserObj);
        } else {
          await User.updateOne({ email: user?.email }, updatedUserObj);
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await User.findOne({ email: token.email });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
});
