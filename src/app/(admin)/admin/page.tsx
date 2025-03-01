import auth from "@/auth";
import { LoginCard } from "@/components/auth";

export default function AdminLoginPage() {
  const session = auth();

  return (
    <div className="grid min-h-screen items-center justify-items-center">
      <div>
        <p className="mb-5 text-center text-2xl font-bold">BetLive24</p>
        <LoginCard />
      </div>
    </div>
  );
}
