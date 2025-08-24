import AuthMethodsSeparator from '@/components/auth/auth-methods-separator';
import SignInForm from '@/components/auth/signin/email-signin';
import GoogleSignIn from '@/components/auth/signin/google-signin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AUTH_PAGES } from '@/util/constants/auth';
import Link from 'next/link';

export default function Page() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login to your account with your email below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <SignInForm />
          <AuthMethodsSeparator />
          <GoogleSignIn />
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href={AUTH_PAGES.SIGN_UP}
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
