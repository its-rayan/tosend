import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  console.log('ROUTES: ', req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: [
  //   // Skip Next.js internals and all static files, unless found in search params
  //   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  //   // Always run for API routes
  //   '/(api|trpc)(.*)',
  // ],
  matcher: [],
};
