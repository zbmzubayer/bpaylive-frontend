import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { ENV_CLIENT } from "@/config";
import { MatchWithSportAndChannel } from "@/types";
import { MdLiveTv } from "react-icons/md";
import dayjs from "dayjs";

export function TrendingMatches({ matches }: { matches: MatchWithSportAndChannel[] }) {
  return (
    <div>
      <h1 className="h1 mb-5">Trending Now</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {matches?.length === 0 && <p>No trending matches available</p>}
        {matches?.map((match) => (
          <li key={match.id} className="max-w-max">
            <a href={`/match/${match.url}`}>
              <div className="relative">
                <div className="absolute left-3 top-3 z-10 flex items-center justify-center rounded-md bg-red-500 px-1.5 py-0.5 text-white">
                  <span className="text-xs md:text-sm">Live</span>
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-300 p-2 text-zinc-700">
                  <FaPlay className="size-4 md:size-6" />
                </div>
                <Image
                  src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${match.thumbnail}`}
                  alt={match.title}
                  width={500}
                  height={300}
                  crossOrigin="anonymous"
                  className="aspect-video rounded-lg object-cover"
                />
              </div>
              <div className="ml-2 mt-1">
                <h3 className="line-clamp-1 font-medium">{match.title}</h3>
                <p className="text-xs text-gray-300 dark:text-gray-400">
                  {dayjs(match.startTime).format("MMMM D, YYYY - h:mm A")}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
