import { LoginCard } from "@/components/auth";
import { Logo } from "@/components/logo";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <div className="grid min-h-screen items-center justify-items-center">
        <div>
          <Logo className="mx-auto" />
          <LoginCard />
        </div>
      </div>
    </Suspense>
  );
}
