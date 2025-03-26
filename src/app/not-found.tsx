import Link from "next/link";
import { button, cn } from "@heroui/react";
import { Logo } from "@/components/logo";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-white">
      <Logo className="size-32" />
      <h1 className="h1">404 - Page Not Found</h1>
      <p className="text-xl font-medium">The page you are looking for does not exist.</p>
      <Link href="/" className={cn(button(), "mt-10 text-base")}>
        Go back to Home
      </Link>
    </div>
  );
}
