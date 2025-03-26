import { CreateSportModal } from "@/components/sport/create-sport-modal";
import { SportTable } from "@/components/sport/sport-table";

export default function SportPage() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="h1">Manage Sports</h1>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <CreateSportModal />
        </div>
        <SportTable />
      </div>
    </div>
  );
}
