import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { SuggestedChannels } from "@/components/channel/suggested-channels";
import { SuggestedMatches } from "@/components/match/suggested-matches";
import { FluidPlayer } from "@/components/ui/fluid-player";
import { ENV_CLIENT } from "@/config";
import { ADVERTISEMENT_KEY, CHANNEL_KEY, MATCH_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { getVideoSourceType } from "@/lib/utils";
import { getAdvertisement, getAllChannel, getAllMatches, getChannelById } from "@/services";
import { Channel } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const res = await getChannelById(id);
  const channel = res.data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `BetPayLive | ${channel.title} - Watch Live TV`,
    description: `Watch ${channel.title} at live television on BetPayLive.`,
    keywords: [channel.title, "betpaylive", "bpaylive", "live stream", "watch live", "live sports"],
    openGraph: {
      images: [`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${channel.icon}`, ...previousImages],
    },
  };
}

export default async function ChannelSteamingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = getQueryClient();

  const { data: channel } = await queryClient.fetchQuery({
    queryKey: [CHANNEL_KEY, id],
    queryFn: () => getChannelById(id),
  });

  const { data: channels } = await queryClient.fetchQuery({
    queryKey: [CHANNEL_KEY],
    queryFn: getAllChannel,
  });

  const { data: matches } = await queryClient.fetchQuery({
    queryKey: [MATCH_KEY],
    queryFn: getAllMatches,
  });
  const { data: advertisement } = await queryClient.fetchQuery({
    queryKey: [ADVERTISEMENT_KEY],
    queryFn: getAdvertisement,
  });

  const streamBannerUrl = advertisement?.streamBannerUrl || undefined;
  const suggestedChannels = channels?.filter(
    (item) => item.id !== channel.id
  ) as unknown as Channel[];

  // Check if the default stream URL is valid
  let defaultStreamUrl = channel.streamUrls[0];
  for (const url of channel.streamUrls) {
    const res = await fetch(url);
    if (res.ok) {
      defaultStreamUrl = url;
      break;
    }
  }
  const suggestedMatches = matches.filter((item) => new Date(item.startTime) < new Date());
  const defaultStreamUrlType = getVideoSourceType(defaultStreamUrl);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="w-full lg:w-[60%]">
        <FluidPlayer url={defaultStreamUrl} title={channel.title} type={defaultStreamUrlType} />
        <div className="mt-5 rounded-2xl bg-accent p-5">
          <div className="flex items-center gap-3">
            <Image
              src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${channel.icon}`}
              alt={channel.title}
              width={100}
              height={100}
              className="size-16 rounded-full object-cover"
            />
            <h2 className="h2">{channel.title}</h2>
          </div>
        </div>
        <div className="relative mt-5 h-[120px]">
          {advertisement?.streamBanner && (
            <a href={streamBannerUrl}>
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${advertisement?.streamBanner}`}
                alt="Advertisement"
                fill
                className="w-full rounded-2xl object-cover"
              />
            </a>
          )}
        </div>
        <div className="mt-5">
          <SuggestedChannels channels={suggestedChannels} />
        </div>
      </div>
      <SuggestedMatches matches={suggestedMatches} />
    </div>
  );
}
