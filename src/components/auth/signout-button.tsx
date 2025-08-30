'use client';

import { Button } from '@/components/ui/button';
import { AUTH_PAGES } from '@/util/constants/auth';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-full"
        onClick={() => signOut({ callbackUrl: AUTH_PAGES.SIGN_IN })}
      >
        Sign out
      </Button>
    </div>
  );
}
