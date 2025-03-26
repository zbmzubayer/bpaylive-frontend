import Image from "next/image";
import dayjs from "dayjs";
import { ENV_CLIENT } from "@/config";
import { MatchWithSportAndChannel } from "@/types";

export function SuggestedMatches({ matches }: { matches: MatchWithSportAndChannel[] }) {
  return (
    <div className="flex-1">
      <h2 className="h2 mb-3">Suggested</h2>
      <div className="flex flex-col gap-4">
        {matches.map((match) => (
          <a key={match.id} href={match.url} className="flex gap-3 rounded-xl bg-accent p-3 shadow">
            <div className="relative h-[90px] w-[130px] overflow-hidden rounded-lg">
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${match.thumbnail}`}
                alt={match.title}
                fill
                crossOrigin="anonymous"
                className="aspect-video rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-md line-clamp-1 font-bold">{match.title}</h3>
                <p className="line-clamp-2 text-sm">{match.description}</p>
              </div>
              <p className="text-xs text-gray-300 dark:text-gray-400">
                {dayjs(match.startTime).format("MMMM D, YYYY - h:mm A")}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
