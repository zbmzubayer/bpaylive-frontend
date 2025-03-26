import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-accent py-10">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xl font-medium">Never miss a match</p>
          <p className="text-xl font-bold">
            Sponsored by <span className="text-primary">BetLive24</span>
          </p>
        </div>
        <div className="mx-auto w-fit">
          <Logo className="inline-block size-20" />
        </div>
        <p className="text-center text-sm text-zinc-300">© {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
}
