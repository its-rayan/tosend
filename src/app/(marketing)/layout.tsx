import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center bg-background">
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl">
        <div className="flex flex-row md:h-[88px] h-16 items-center justify-between px-6 mx-auto max-w-[1072px]">
          <nav className="hidden md:flex items-center space-x-[6px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-row justify-start items-center gap-2 p-2 -m-2 cursor-pointer pr-6 pt-1"
            >
              <span className="font-bold text-xl">tosend</span>
            </Link>
          </nav>

          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-row gap-2.5">
              <Button size="sm" variant="secondary" className="cursor-pointer">
                Login
              </Button>
              <Button size="sm" className="cursor-pointer">
                Get Started For Free
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between px-6 mx-auto max-w-[1072px] opacity-0">
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 w-full h-[1px] bg-border2"
          ></div>
        </div>
      </header>
      {children}
    </div>
  );
}
