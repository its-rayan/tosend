'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkAccountExistsAction } from '@/lib/actions/auth/check-account-exists';
import { signIn } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignInForm() {
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
      toast.error('No account found with that email address.');
      return;
    }

    await signIn('nodemailer', { email, redirectTo: '/workspace' });
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
    </form>
  );
}
