'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex flex-col items-center">
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1072px] flex-row items-center justify-between px-6 md:h-[88px]">
          <nav className="hidden items-center space-x-[6px] md:flex">
            {/* Logo */}
            <Link
              href="/"
              className="-m-2 flex cursor-pointer flex-row items-center justify-start gap-2 p-2 pt-1 pr-6"
            >
              <span className="text-xl font-bold">tosend</span>
            </Link>
          </nav>

          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-row gap-2.5">
              <Button size="sm" variant="secondary" className="cursor-pointer">
                Login
              </Button>
              <Button
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  signIn('undefined', { callbackUrl: '/workspace' })
                }
              >
                Get Started For Free
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1072px] flex-row items-center justify-between px-6 opacity-0">
          <div
            data-orientation="horizontal"
            role="none"
            className="bg-border2 h-[1px] w-full shrink-0"
          ></div>
        </div>
      </header>
      {children}
    </div>
  );
}
