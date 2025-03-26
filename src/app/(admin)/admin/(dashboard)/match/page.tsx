import { CreateMatchModal } from "@/components/match/create-match-modal";
import { MatchTable } from "@/components/match/match-table";

export default function MatchPage() {
  return (
    <div>
      <div className="flex items-center gap-2">
        {/* <FaUser className="size-6" /> */}
        <h1 className="h1">Manage Matches</h1>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <CreateMatchModal />
        </div>
        <MatchTable />
      </div>
    </div>
  );
}
