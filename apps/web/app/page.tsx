import { Button } from "@repo/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <header className="mx-auto w-full px-3 relative max-w-screen-lg lg:px-4 xl:px-0">
        <div className="flex h-14 items-center justify-between">
          <div className="grow basis-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wide">mademail</span>
            </Link>
          </div>
          <nav>
            <ul className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center">
              <li className="px-3">
                <a href="#">How it works</a>
              </li>
              <li className="px-3">
                <a href="#">Features</a>
              </li>
              <li className="px-3">
                <a href="#">Pricing</a>
              </li>
            </ul>
          </nav>
          <div className="hidden grow basis-0 justify-end gap-2 lg:flex">
            <Button variant="default">Join the waitlist</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full px-3 relative max-w-screen-lg lg:px-4 xl:px-0">
        <section id="hero" className="relative w-full">
          <div className="relative z-10 pt-30 pb-30 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
            <a
              href="#"
              className="rounded-full bg-neutral-800 text-white px-6 py-2 text-md hover:bg-neutral-700 transition-colors"
            >
              <span>Join our waitlist to get early access</span>
            </a>

            <div>
              <h1 className="text-6xl font-bold text-center leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                The AI-Enhanced Email Builder for Teams
              </h1>
              <p className="text-lg text-center text-neutral-600 dark:text-neutral-400 mt-4">
                Mademail is the design-first, AI-enhanced email builder for
                teams. Create beautiful emails with ease and collaborate
                seamlessly.
              </p>
            </div>

            <div className="flex items-center gap-8 flex-wrap justify-center">
              <a
                href="#"
                className="flex flex-col items-center bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors text-center h-18 w-84 justify-center"
              >
                <p className="text-xl">👉 Join the Early Access List</p>
                <p className="text-sm">Coming soon</p>
              </a>

              <a
                href="#"
                className="flex flex-col items-center rounded-lg transition-colors text-center h-18 w-84 justify-center border border-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              >
                <p className="text-xl">Checkout The Features</p>
              </a>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 relative w-full">
          <div className="p-10 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center text-center">
            <div>
              <h1 className="text-5xl font-bold text-center leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                Build Beautiful Emails
              </h1>
              <p className="text-lg text-center text-neutral-600 dark:text-neutral-400 mt-4">
                From first draft to final send.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
