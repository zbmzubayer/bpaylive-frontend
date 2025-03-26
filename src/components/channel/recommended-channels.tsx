import Image from "next/image";
import { ENV_CLIENT } from "@/config";
import { ChannelWithSports } from "@/types";

export function RecommendedChannels({ channels }: { channels: ChannelWithSports[] }) {
  return (
    <div>
      <h1 className="h1 mb-5">Recommended Channels</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {channels?.length === 0 && <p>No trending matches available</p>}
        {channels?.map((item) => (
          <li key={item.id} className="border-2 border-black">
            <Image
              src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
              alt={item.title}
              width={500}
              height={500}
              crossOrigin="anonymous"
              className="aspect-[4/3] object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
