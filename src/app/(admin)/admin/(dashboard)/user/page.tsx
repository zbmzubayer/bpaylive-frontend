import { CreateUserModal } from "@/components/user/create-user-modal";
import { UserTable } from "@/components/user/user-table";
import { FaUser } from "react-icons/fa6";

export default async function UserPage() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <FaUser className="size-6" />
        <h1 className="h1">Manage Users</h1>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <CreateUserModal />
        </div>
        <UserTable />
      </div>
    </div>
  );
}
