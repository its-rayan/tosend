import { Button } from "@repo/ui";

export default function Home() {
  return (
    <div>
      <div className="mx-auto w-full px-3 relative max-w-screen-lg lg:px-4 xl:px-0">
        <div className="flex h-14 items-center justify-between">
          <div className="grow basis-0"> mademail</div>
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
            <Button variant="default">Join waitlist</Button>
          </div>
        </div>
      </div>

      <h1>hello</h1>
    </div>
  );
}
