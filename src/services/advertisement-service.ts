import { axiosInstance } from "@/lib";
import { Advertisement } from "@/types/advertisement";

const ADVERTISEMENT_ENDPOINT = "/advertisement";

export const saveCarousel = async (data: FormData) => {
  return axiosInstance.patch(`${ADVERTISEMENT_ENDPOINT}/carousel`, data);
};

export const savePopupBanner = async (data: FormData) => {
  return axiosInstance.patch(`${ADVERTISEMENT_ENDPOINT}/popup-banner`, data);
};

export const saveStreamingBanner = async (data: FormData) => {
  return axiosInstance.patch(`${ADVERTISEMENT_ENDPOINT}/stream-banner`, data);
};

export const getAdvertisement = async () => {
  return axiosInstance.get<Advertisement>(ADVERTISEMENT_ENDPOINT);
};
