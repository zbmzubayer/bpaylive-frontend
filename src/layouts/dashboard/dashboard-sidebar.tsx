import auth from "@/auth";
import { Logout } from "@/components/auth";
import { ToggleTheme } from "@/components/toggle-theme";
import { DASHBOARD_SIDEBAR_ITEMS } from "@/constants";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default async function DashboardSidebar() {
  const session = await auth();

  if (!session) return null;

  return (
    <aside className="w-[240px] border-r border-r-content3 bg-content2 p-2 shadow-lg shadow-black">
      <div className="flex h-full w-full flex-col">
        <ToggleTheme size="sm" className="w-full rounded-lg" />
        <div className="my-3 flex items-center gap-1 rounded-lg bg-default px-3 py-2 text-sm font-medium text-foreground">
          <FaUserCircle className="size-5" />
          <p>{session.user.username}</p>
        </div>
        <nav>
          <ul className="text-sm">
            {DASHBOARD_SIDEBAR_ITEMS.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="inline-block w-full rounded-md px-3 py-2 hover:bg-default"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Logout className="mb-5 mt-auto w-full font-medium text-danger">
          <MdLogout className="size-4" />
          Logout
        </Logout>
      </div>
    </aside>
  );
}
