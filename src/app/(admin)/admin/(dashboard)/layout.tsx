import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardDrawer from "@/layouts/dashboard/dashboard-drawer";
import DashboardSidebar from "@/layouts/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <ScrollArea className="h-screen w-screen bg-content2">
        <main className="flex-1 p-4">{children}</main>
      </ScrollArea>
    </div>
  );
}
