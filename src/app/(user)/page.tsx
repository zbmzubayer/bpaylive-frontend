export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { AdvertisementCarousel } from "@/components/advertisement/advertisement-carousel";
import AdvertisementPopup from "@/components/advertisement/advertisement-popup";
import { RecommendedChannels } from "@/components/channel/recommended-channels";
import { TrendingMatches } from "@/components/match/trending-matches";
import { ADVERTISEMENT_KEY, CHANNEL_KEY, MATCH_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { getAllChannel, getAllMatches } from "@/services";
import { getAdvertisement } from "@/services/advertisement-service";

export const metadata: Metadata = {
  title: "BetPayLive | Watch Live Stream",
  description: "Watch live sports and enjoy the best matches on BetPayLive.",
  keywords: [
    "live stream",
    "watch live",
    "live sports",
    "bpaylive",
    "betpaylive",
    "sports",
    "advertisement",
  ],
};

export default async function Home() {
  const queryClient = getQueryClient();
  const { data: advertisementData } = await queryClient.fetchQuery({
    queryKey: [ADVERTISEMENT_KEY],
    queryFn: getAdvertisement,
  });
  const { data: matchesData } = await queryClient.fetchQuery({
    queryKey: [MATCH_KEY],
    queryFn: getAllMatches,
  });
  const { data: channelsData } = await queryClient.fetchQuery({
    queryKey: [CHANNEL_KEY],
    queryFn: getAllChannel,
  });

  const carouselBanners = [
    advertisementData?.carouselBanner1,
    advertisementData?.carouselBanner2,
    advertisementData?.carouselBanner3,
    advertisementData?.carouselBanner4,
    advertisementData?.carouselBanner5,
  ]?.filter((banner) => banner !== null && banner !== undefined);

  const carouselBannerUrls = [
    advertisementData?.carouselBanner1Url,
    advertisementData?.carouselBanner2Url,
    advertisementData?.carouselBanner3Url,
    advertisementData?.carouselBanner4Url,
    advertisementData?.carouselBanner5Url,
  ]?.filter((url) => url !== "" && url !== null && url !== undefined);

  const carouselBannersWithUrls = carouselBanners?.map((banner, index) => ({
    banner,
    url: carouselBannerUrls[index] ?? undefined,
  }));

  const trendingMatches = matchesData?.filter((item) => item?.trending);
  const recommendedChannels = channelsData?.filter((item) => item?.recommended);

  return (
    <div className="space-y-10">
      {advertisementData?.popupBanner && (
        <AdvertisementPopup
          popupBanner={advertisementData.popupBanner}
          popupBannerUrl={advertisementData?.popupBannerUrl}
        />
      )}
      {advertisementData && carouselBanners?.length > 0 && (
        <AdvertisementCarousel bannersWithUrl={carouselBannersWithUrls} />
      )}
      <TrendingMatches matches={trendingMatches} />
      <RecommendedChannels channels={recommendedChannels} />
    </div>
  );
}
