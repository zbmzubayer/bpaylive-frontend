import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import dayjs from "dayjs";
import { ENV_CLIENT } from "@/config";
import { ADVERTISEMENT_KEY, MATCH_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { getAllMatches, getMatchByURL } from "@/services";
import { SuggestedChannels } from "@/components/channel/suggested-channels";
import { ExpandableText } from "@/components/ui/expandable-text";
import { getVideoSourceType } from "@/lib/utils";
import { getAdvertisement } from "@/services/advertisement-service";
import { SuggestedMatches } from "@/components/match/suggested-matches";
import { FluidPlayer } from "@/components/ui/fluid-player";

type Props = {
  params: Promise<{ url: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { url } = await params;

  // fetch data
  const res = await getMatchByURL(url);
  const match = res.data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `BetPayLive | ${match.title} - Watch Live Stream`,
    description: `Watch ${match.title} at ${dayjs(match.startTime).format("MMMM D, YYYY - h:mm A")} live stream on BetPayLive. ${match.description}`,
    keywords: [
      match.title,
      match.sport.name,
      "betpaylive",
      "bpaylive",
      "betlive",
      "live stream",
      "watch live",
      "live sports",
    ],
    openGraph: {
      images: [`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${match.thumbnail}`, ...previousImages],
    },
  };
}

export default async function StreamPage({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params;

  const queryClient = getQueryClient();
  const { data } = await queryClient.fetchQuery({
    queryKey: [MATCH_KEY, url],
    queryFn: () => getMatchByURL(url),
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

  const suggestedChannels = data.channelMatches
    .filter((item) => item.channel.id !== data.defaultChannel.id)
    .map((item) => item.channel);

  // Check if the default stream URL is valid
  let defaultStreamUrl = data.defaultChannel.streamUrls[0];
  for (const url of data.defaultChannel.streamUrls) {
    const res = await fetch(url);
    if (res.ok) {
      defaultStreamUrl = url;
      break;
    }
  }
  const suggestedMatches = matches.filter(
    (item) => item.id !== data.id && new Date(item.startTime) < new Date()
  );
  const defaultStreamUrlType = getVideoSourceType(defaultStreamUrl);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="w-full lg:w-[60%]">
        <FluidPlayer url={defaultStreamUrl} title={data.title} type={defaultStreamUrlType} />
        <div className="mt-5 rounded-2xl bg-accent p-5">
          <h1 className="h1 mb-2">{data.title}</h1>
          <div className="flex items-center gap-3">
            <Image
              src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${data.defaultChannel.icon}`}
              alt={data.defaultChannel.title}
              width={100}
              height={100}
              className="size-16 rounded-full object-cover"
            />
            <h2 className="h2">{data.defaultChannel.title}</h2>
          </div>

          <ExpandableText text={data.description} className="mt-3" />
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
