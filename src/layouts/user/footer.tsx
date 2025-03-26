import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-accent py-10">
      <div className="container">
        <p className="text-xl font-bold">Never miss a match</p>
        <Logo className="size-20" />
        <p className="text-center text-sm text-zinc-300">© {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
}
