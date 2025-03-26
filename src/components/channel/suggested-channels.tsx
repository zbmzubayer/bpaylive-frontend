import { ENV_CLIENT } from "@/config";
import { Channel } from "@/types";
import Image from "next/image";

export function SuggestedChannels({ channels }: { channels: Channel[] }) {
  return (
    <>
      <h2 className="h2 mb-3">Suggested Channels</h2>
      <ul className="flex flex-wrap items-center gap-3">
        {channels?.length === 0 && <p>No suggested channels available</p>}
        {channels?.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-full">
            <Image
              src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
              alt={item.title}
              width={100}
              height={100}
              crossOrigin="anonymous"
              className="size-16 bg-white p-1"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
