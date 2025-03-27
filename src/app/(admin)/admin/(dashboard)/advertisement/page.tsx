import { Card, CardBody } from "@heroui/card";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PopupAdvertisementForm } from "@/components/advertisement/popup-advertisement-form";
import { CarouselAdvertisementForm } from "@/components/advertisement/carousel-advertisement-form";
import { StreamingAdvertisementForm } from "@/components/advertisement/streaming-advertisement-form";
import { getQueryClient } from "@/lib";
import { ADVERTISEMENT_KEY } from "@/constants/query-key";
import { getAdvertisement } from "@/services/advertisement-service";

export default async function AdvertisementPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: [ADVERTISEMENT_KEY], queryFn: getAdvertisement });

  return (
    <div>
      <h1 className="h1 mb-3">Manage Advertisements</h1>
      <div className="flex flex-col gap-5">
        <Card className="p-2">
          <CardBody>
            <h2 className="mb-2 text-xl font-medium">Carousel Advertisement</h2>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <CarouselAdvertisementForm />
            </HydrationBoundary>
          </CardBody>
        </Card>
        <div className="flex flex-col gap-5 md:flex-row">
          <Card className="p-2">
            <CardBody>
              <h2 className="mb-2 text-xl font-medium">Popup Advertisement</h2>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <PopupAdvertisementForm />
              </HydrationBoundary>
            </CardBody>
          </Card>
          <Card className="p-2">
            <CardBody>
              <h2 className="mb-2 text-xl font-medium">Stream Advertisement</h2>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <StreamingAdvertisementForm />
              </HydrationBoundary>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
