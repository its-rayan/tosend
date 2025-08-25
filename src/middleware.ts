import authConfig from '@/auth.config';
import {
  AUTH_FLOW_ROUTES,
  AUTH_PAGES,
  AUTH_SUCCESS_CALLBACK,
} from '@/util/constants/auth';
import NextAuth from 'next-auth';
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isNextAuthApiRoute = nextUrl.pathname.startsWith(
    AUTH_FLOW_ROUTES.API_PREFIX,
  );
  const isPublicRoute = AUTH_FLOW_ROUTES.PUBLIC.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_FLOW_ROUTES.AUTH.includes(nextUrl.pathname);

  if (isNextAuthApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AUTH_SUCCESS_CALLBACK, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(AUTH_PAGES.SIGN_IN, req.url));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
