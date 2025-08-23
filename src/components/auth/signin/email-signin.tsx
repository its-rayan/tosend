'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignInForm() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });

  const { register, getValues } = form;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    e.preventDefault();
    const { email } = getValues();
    await signIn('resend', { email, redirectTo: '/workspace' });
    setIsPending(false);
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
