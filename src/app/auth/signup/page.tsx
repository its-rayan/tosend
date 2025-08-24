import AuthMethodsSeparator from '@/components/auth/auth-methods-separator';
import SignUpForm from '@/components/auth/signup/email-signup';
import GoogleSignUp from '@/components/auth/signup/google-signup';
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
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Create an account with your Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <GoogleSignUp />
          <AuthMethodsSeparator />
          <SignUpForm />
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link
              href={AUTH_PAGES.SIGN_IN}
              className="underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
