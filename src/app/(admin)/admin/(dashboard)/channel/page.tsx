import { ChannelTable } from "@/components/channel/channel-table";
import { CreateChannelModal } from "@/components/channel/create-channel-modal";

export default function ChannelPage() {
  return (
    <div>
      <div className="flex items-center gap-2">
        {/* <FaUser className="size-6" /> */}
        <h1 className="h1">Manage Channels</h1>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <CreateChannelModal />
        </div>
        <ChannelTable />
      </div>
    </div>
  );
}
