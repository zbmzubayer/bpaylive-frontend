import Image from "next/image";
import { ENV_CLIENT } from "@/config";
import { ADVERTISEMENT_KEY, MATCH_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { getAllMatches, getMatchByURL } from "@/services";
import { SuggestedChannels } from "@/components/channel/suggested-channels";
import { ExpandableText } from "@/components/ui/expandable-text";
import { FluidPlayer } from "@/components/ui/fluid-player";
import { getVideoSourceType } from "@/lib/utils";
import { getAdvertisement } from "@/services/advertisement-service";
import { SuggestedMatches } from "@/components/match/suggested-matches";

export default async function StreamingPage({ params }: { params: Promise<{ url: string }> }) {
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
        <div className="relative mt-5 h-[250px]">
          {advertisement?.streamBanner && (
            <Image
              src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${advertisement?.streamBanner}`}
              alt="Advertisement"
              fill
              className="w-full rounded-2xl object-cover"
            />
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
