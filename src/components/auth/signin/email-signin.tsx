'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkAccountExistsAction } from '@/lib/actions/auth/check-account-exists';
import { signIn } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import VerifyEmail from '../verify-email';

export default function SignInForm() {
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const { executeAsync, isPending } = useAction(checkAccountExistsAction, {
    onError: ({ error }) => {
      console.error('Error checking account existence:', error);
      toast.error(error.serverError);
    },
  });

  const form = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });

  const { register, getValues } = form;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = getValues();

    const result = await executeAsync({ email });
    if (!result?.data) return;

    // check if account exists before sending magic link
    const { accountExists } = result.data;
    if (!accountExists) {
      toast.error('No account found with that email address. Please sign up.');
      return;
    }

    // TODO: FIND A BETTER WAY TO OPTIMISTICALLY SHOW VERIFY EMAIL COMPONENT
    setIsVerifyingEmail(true);

    const provider =
      process.env.NODE_ENV === 'production' ? 'resend' : 'nodemailer';

    await signIn(provider, {
      email,
      redirectTo: '/workspace',
      redirect: false,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register('email')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Login'}
        </Button>
      </div>
      {isVerifyingEmail && <VerifyEmail />}
    </form>
  );
}
