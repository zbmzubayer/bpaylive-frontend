import { AuthProvider } from "@/contexts";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthProvider>{children}</AuthProvider>;
}
