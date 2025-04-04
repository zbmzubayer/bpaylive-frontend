import { Footer } from "@/layouts/user/footer";
import { Header } from "@/layouts/user/header";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white">
      <Header />
      <main className="container min-h-screen py-3">{children}</main>
      <Footer />
    </div>
  );
}
