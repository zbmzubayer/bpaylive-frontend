"use client";

import { Logo } from "@/components/logo";
import { UserToggleTheme } from "@/components/ui/user-toggle-theme";
import { ENV_CLIENT } from "@/config";
import { CHANNEL_KEY, SPORT_KEY } from "@/constants/query-key";
import Menu from "@/layouts/user/menu";
import { getAllChannel, getAllSport } from "@/services";
import { ChannelWithSports, Sport } from "@/types";
import { Spinner } from "@heroui/spinner";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";

export function Header() {
  const [{ data: sportData, isFetching: sportIsFetching }, { data: channelData, isFetching }] =
    useQueries({
      queries: [
        { queryKey: [SPORT_KEY], queryFn: getAllSport },
        { queryKey: [CHANNEL_KEY], queryFn: getAllChannel },
      ],
    });

  const sports = sportData?.data.map((sport) => ({
    ...sport,
    icon: `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${sport.icon}`,
  }));
  const channels = channelData?.data.map((channel) => ({
    ...channel,
    icon: `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${channel.icon}`,
  }));

  return (
    <header className="border-b border-accent">
      <nav className="container flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo className="size-20" />
          <SportsDropdownMenu sports={sports!} isFetching={sportIsFetching} />
          <ChannelsDropdownMenu channels={channels!} isFetching={isFetching} />
        </div>
        <div className="space-x-3">
          <UserToggleTheme />
          <Menu />
        </div>
      </nav>
    </header>
  );
}

function SportsDropdownMenu({ sports, isFetching }: { sports: Sport[]; isFetching: boolean }) {
  return (
    <div className="group relative hidden sm:block">
      <button className="flex items-center px-2 py-4 font-medium transition duration-300">
        <span>Sports</span>
        <FaChevronDown className="ml-2 size-3 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 z-50 mt-0 w-48 origin-top scale-95 transform rounded-md bg-accent opacity-0 shadow-lg transition duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:bg-default">
        {isFetching && <Spinner />}
        <ul className="rounded-lg py-1 shadow-small">
          {sports?.map((sport) => (
            <li
              key={sport.id}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-background dark:hover:bg-default-400"
            >
              <Image
                src={sport.icon as string}
                alt={sport.name}
                crossOrigin="anonymous"
                width={24}
                height={24}
                className="aspect-square rounded-full"
              />
              {sport.name}
            </li>
          ))}
          {sports?.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-300">No sports available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function ChannelsDropdownMenu({
  channels,
  isFetching,
}: {
  channels: ChannelWithSports[];
  isFetching: boolean;
}) {
  return (
    <div className="group relative hidden sm:block">
      <button className="flex items-center px-2 py-4 font-medium transition duration-300">
        <span>Channels</span>
        <FaChevronDown className="ml-2 size-3 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 z-50 mt-0 w-48 origin-top scale-95 transform rounded-md bg-accent opacity-0 shadow-lg transition duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:bg-default">
        {isFetching && <Spinner />}
        <ul className="rounded-lg py-1 shadow-small">
          {channels?.map((item) => (
            <li key={item.id}>
              <a
                href={`/channel/${item.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-background dark:hover:bg-default-400"
              >
                <Image
                  src={item.icon as string}
                  alt={item.title}
                  crossOrigin="anonymous"
                  width={24}
                  height={24}
                  className="aspect-square rounded-full"
                />
                {item.title}
              </a>
            </li>
          ))}
          {channels?.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-300">No channels available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
