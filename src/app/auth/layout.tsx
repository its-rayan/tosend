import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent-foreground flex min-h-screen flex-col">
      <header className="p-4 text-white">
        <Link href="/" className="flex items-center gap-0.5">
          <Image src="/logo-light.svg" alt="tosend" width={32} height={32} />
          <h1 className="text-lg font-medium">tosend</h1>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
